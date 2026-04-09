import { GraphQLError } from 'graphql'
import { eq, and, lt, desc, ne, gte, inArray, count as drizzleCount } from 'drizzle-orm'
import { venus, cells } from '@/db/schema'
import { ROLE_ADMIN } from '@/server/auth'
import type { GraphQLContext } from '../context'

// Venus source constants
const VENUS_SOURCE_UNKNOWN = 0
const VENUS_SOURCE_WEIBO = 1
const VENUS_SOURCE_RED = 2
const VENUS_SOURCE_JIKE = 3
const VENUS_SOURCE_ZHIHU = 4
const VENUS_SOURCE_DOUBAN = 5
const VENUS_SOURCE_INSTGREAM = 6

const venusEnumMapping: Record<number, string> = {
  [VENUS_SOURCE_UNKNOWN]: 'unknown',
  [VENUS_SOURCE_WEIBO]: 'weibo',
  [VENUS_SOURCE_RED]: 'red',
  [VENUS_SOURCE_JIKE]: 'jike',
  [VENUS_SOURCE_ZHIHU]: 'zhihu',
  [VENUS_SOURCE_DOUBAN]: 'douban',
  [VENUS_SOURCE_INSTGREAM]: 'instgream',
}

function venusStrToInt(str: string): number {
  for (const [k, v] of Object.entries(venusEnumMapping)) {
    if (v === str) return parseInt(k, 10)
  }
  return VENUS_SOURCE_UNKNOWN
}

function ensureAdmin(ctx: GraphQLContext) {
  if (!ctx.user || (ctx.user.role ?? 0) < ROLE_ADMIN) {
    throw new GraphQLError('No permission', { extensions: { code: 403 } })
  }
  return ctx.user
}

function formatVenusRow(v: typeof venus.$inferSelect) {
  return {
    id: v.id,
    uid: v.uid,
    source: venusEnumMapping[v.source ?? 0] ?? 'unknown',
    name: v.name ?? '',
    avatar: v.avatar ?? '',
    bio: v.bio ?? '',
    initLoaded: v.initLoad ?? false,
    rawData: v.rawData ?? '',
    createdAt: v.createdAt?.toISOString() ?? '',
    updatedAt: v.updatedAt?.toISOString() ?? '',
    remarks: v.remarks ?? '',
    priority: v.priority ?? 0,
  }
}

export const venusResolvers = {
  Query: {
    venusList: async (
      _: unknown,
      args: {
        pagination: { lastID: number; limit: number }
        source?: string | null
        loaded?: boolean | null
        hasRemarks?: boolean | null
        priority?: number | null
      },
      ctx: GraphQLContext
    ) => {
      ensureAdmin(ctx)

      // Build conditions for count query (without pagination)
      const baseConditions: ReturnType<typeof eq>[] = []

      if (args.source != null) {
        baseConditions.push(eq(venus.source, venusStrToInt(args.source)))
      }

      if (args.loaded != null) {
        baseConditions.push(eq(venus.initLoad, args.loaded))
      }

      if (args.hasRemarks != null) {
        if (args.hasRemarks) {
          baseConditions.push(ne(venus.remarks, ''))
        } else {
          baseConditions.push(eq(venus.remarks, ''))
        }
      }

      if (args.priority != null) {
        baseConditions.push(gte(venus.priority, args.priority))
      }

      // Get total count
      const countQuery = baseConditions.length > 0
        ? ctx.db.select({ value: drizzleCount() }).from(venus).where(and(...baseConditions))
        : ctx.db.select({ value: drizzleCount() }).from(venus)

      const [countResult] = await countQuery
      const totalCount = countResult?.value ?? 0

      // Get edges with cursor-based pagination
      const paginationConditions = [
        ...baseConditions,
        lt(venus.id, args.pagination.lastID),
      ]

      const rows = await ctx.db
        .select()
        .from(venus)
        .where(and(...paginationConditions))
        .orderBy(desc(venus.id))
        .limit(args.pagination.limit)

      return {
        count: totalCount,
        edges: rows.map(formatVenusRow),
      }
    },
  },

  Mutation: {
    addVenus: async (
      _: unknown,
      args: {
        uid: string
        source: string
        name?: string | null
        avatar?: string | null
        bio?: string | null
        rawData?: string | null
      },
      ctx: GraphQLContext
    ) => {
      ensureAdmin(ctx)

      const venusSource = venusStrToInt(args.source)

      // Check if already exists
      const [existing] = await ctx.db
        .select()
        .from(venus)
        .where(and(eq(venus.uid, args.uid), eq(venus.source, venusSource)))
        .limit(1)

      if (existing) {
        // Bump priority if duplicate
        await ctx.db
          .update(venus)
          .set({ priority: 100 })
          .where(and(eq(venus.uid, args.uid), eq(venus.source, venusSource)))

        throw new GraphQLError(`User ${args.uid} already exists`, { extensions: { code: 409 } })
      }

      const [newVenus] = await ctx.db
        .insert(venus)
        .values({
          uid: args.uid,
          source: venusSource,
          name: args.name ?? '',
          avatar: args.avatar ?? '',
          bio: args.bio ?? '',
          rawData: args.rawData ?? '',
          initLoad: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning()

      if (!newVenus) {
        throw new GraphQLError('Failed to create venus', { extensions: { code: 500 } })
      }

      return formatVenusRow(newVenus)
    },

    removeVenus: async (
      _: unknown,
      args: { id?: number | null; weiboUid?: string[] | null },
      ctx: GraphQLContext
    ) => {
      ensureAdmin(ctx)

      if (args.id != null) {
        const [v] = await ctx.db
          .select()
          .from(venus)
          .where(eq(venus.id, args.id))
          .limit(1)

        if (!v) {
          throw new GraphQLError('Venus not found', { extensions: { code: 404 } })
        }

        if ((v.source ?? 0) !== VENUS_SOURCE_WEIBO) {
          console.warn(`Remove venus rejected: not a weibo source, venusId=${v.id}`)
          return false
        }

        // Delete associated cells in the background
        ctx.db
          .delete(cells)
          .where(eq(cells.fromId, v.uid))
          .then(() => {
            console.log(`Deleted cells for venus uid=${v.uid}`)
          })
          .catch((e: unknown) => {
            console.error('Background cell deletion failed:', e)
          })

        await ctx.db.delete(venus).where(eq(venus.id, args.id))
      }

      if (args.weiboUid && args.weiboUid.length > 0) {
        await ctx.db
          .delete(venus)
          .where(and(
            inArray(venus.uid, args.weiboUid),
            eq(venus.source, VENUS_SOURCE_WEIBO),
          ))

        // Delete associated cells in the background
        ctx.db
          .delete(cells)
          .where(inArray(cells.fromId, args.weiboUid))
          .then(() => {
            console.log(`Deleted cell rows for weibo UIDs`)
          })
          .catch((e: unknown) => {
            console.error('Background cell deletion failed:', e)
          })
      }

      return true
    },

    updateVenus: async (
      _: unknown,
      args: {
        id: number
        name?: string | null
        avatar?: string | null
        bio?: string | null
        initLoaded?: boolean | null
        rawData?: string | null
        remarks?: string | null
      },
      ctx: GraphQLContext
    ) => {
      ensureAdmin(ctx)

      const [existing] = await ctx.db
        .select()
        .from(venus)
        .where(eq(venus.id, args.id))
        .limit(1)

      if (!existing) {
        throw new GraphQLError('Venus not found', { extensions: { code: 404 } })
      }

      const updates: Record<string, unknown> = {
        updatedAt: new Date(),
      }

      if (args.name != null) updates.name = args.name
      if (args.avatar != null) updates.avatar = args.avatar
      if (args.bio != null) updates.bio = args.bio
      if (args.initLoaded != null) updates.initLoad = args.initLoaded
      if (args.rawData != null) updates.rawData = args.rawData
      if (args.remarks != null) updates.remarks = args.remarks

      const [updated] = await ctx.db
        .update(venus)
        .set(updates)
        .where(eq(venus.id, args.id))
        .returning()

      if (!updated) {
        throw new GraphQLError('Failed to update venus', { extensions: { code: 500 } })
      }

      return formatVenusRow(updated)
    },
  },
}
