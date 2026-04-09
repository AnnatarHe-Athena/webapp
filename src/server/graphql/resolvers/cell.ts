import { GraphQLError } from 'graphql'
import { eq, and, lt, desc, sql, inArray } from 'drizzle-orm'
import { cells, collections, venus } from '@/db/schema'
import { getKeyFromUserEmail, encrypt, sha256Encode } from '@/server/crypto'
import { rateLimit, cacheGet, cacheSet } from '@/server/redis'
import { ROLE_ADMIN, ROLE_PAID, ROLE_NORMAL } from '@/server/auth'
import type { GraphQLContext, UserRecord } from '../context'

// Venus source constants matching Go
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

function detectVenusSource(fromURL: string): number {
  if (fromURL.includes('weibo.com')) return VENUS_SOURCE_WEIBO
  if (fromURL.startsWith('https://www.xiaohongshu.com')) return VENUS_SOURCE_RED
  if (fromURL.includes('zhihu.com')) return VENUS_SOURCE_ZHIHU
  return 0
}

function encryptCellImage(img: string, email: string): string {
  const s3Domain = process.env.S3_DOMAIN || 'https://cdn-lc.annatarhe.cn'

  if (img.startsWith('qn://')) {
    img = `${s3Domain}/${img.replace(/^qn:\/\//, '')}`
  }

  const key = getKeyFromUserEmail(email)
  const imgBase64 = Buffer.from(img, 'utf-8').toString('base64')
  const encrypted = encrypt(key, Buffer.from(imgBase64, 'utf-8'))
  return encrypted.toString('base64')
}

function ensureUser(ctx: GraphQLContext): UserRecord {
  if (!ctx.user) {
    throw new GraphQLError('Unauthorized', { extensions: { code: 401 } })
  }
  return ctx.user
}

async function getCellsFetchCountRemaining(user: UserRecord): Promise<number> {
  if ((user.role ?? 0) > ROLE_ADMIN) return 1

  const limitPerHour = (user.role ?? 0) > ROLE_PAID ? 3600 : 600
  const { remaining } = await rateLimit(`ratelimit:cells:${user.id}`, limitPerHour, 3600)
  return remaining
}

interface CellRow {
  id: number
  img: string
  text: string | null
  cate: number | null
  permission: number | null
  createdAt: Date
  fromUrl: string | null
  fromId: string | null
  content: string | null
  venusId: number | null
  createdBy: number | null
  md5: string | null
}

async function resolveGirlFields(cell: CellRow, owner: UserRecord | null, ctx: GraphQLContext) {
  const email = owner?.email ?? 'testing.0a1964f087615a4581972fec9@annatarhe.com'
  const encryptedImg = encryptCellImage(cell.img, email)

  // Resolve isCollected
  let isCollected = false
  if (owner && owner.id > 0) {
    const [col] = await ctx.db
      .select()
      .from(collections)
      .where(and(eq(collections.cell, cell.id), eq(collections.owner, owner.id)))
      .limit(1)
    if (col && !col.isDislike) {
      isCollected = true
    }
  }

  // Resolve venus
  let venusData: {
    id: number
    uid: string
    source: string
    name: string
    avatar: string
    bio: string
    initLoaded: boolean
    rawData: string
    createdAt: string
    updatedAt: string
    remarks: string
    priority: number
  } = {
    id: 0,
    uid: '',
    source: 'unknown',
    name: '',
    avatar: '',
    bio: '',
    initLoaded: false,
    rawData: '',
    createdAt: '',
    updatedAt: '',
    remarks: '',
    priority: 0,
  }

  if (cell.venusId && cell.venusId > 0) {
    const [v] = await ctx.db
      .select()
      .from(venus)
      .where(eq(venus.id, cell.venusId))
      .limit(1)
    if (v) {
      venusData = formatVenus(v, owner)
    }
  }

  // Fallback: try to find venus by fromId + source
  if (venusData.id === 0 && cell.fromUrl) {
    const source = detectVenusSource(cell.fromUrl)
    if (source > 0 && cell.fromId) {
      const [v] = await ctx.db
        .select()
        .from(venus)
        .where(and(eq(venus.uid, cell.fromId), eq(venus.source, source)))
        .limit(1)
      if (v) {
        venusData = formatVenus(v, owner)
      }
    }
  }

  // Mask fromID/fromURL for non-paid users
  const isPaid = owner && (owner.role ?? 0) >= ROLE_PAID
  const fromID = isPaid ? (cell.fromId ?? '') : ''
  const fromURL = isPaid ? (cell.fromUrl ?? '') : ''

  return {
    id: String(cell.id),
    img: encryptedImg,
    text: cell.text ?? '',
    cate: cell.cate ?? 0,
    permission: cell.permission ?? 2,
    createdAt: Math.floor(cell.createdAt.getTime() / 1000),
    fromID,
    fromURL,
    content: cell.content ?? '',
    venus: venusData,
    isCollected,
  }
}

function formatVenus(
  v: typeof venus.$inferSelect,
  owner: UserRecord | null,
) {
  let remarksValue = v.remarks ?? ''
  if (owner) {
    if ((owner.role ?? 0) >= ROLE_PAID) {
      remarksValue = v.remarks ?? ''
    } else {
      remarksValue = v.remarks ? '402' : ''
    }
  } else {
    remarksValue = v.remarks ? '402' : ''
  }

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
    remarks: remarksValue,
    priority: v.priority ?? 0,
  }
}

async function asyncCheckVenus(fromURL: string, fromID: string, ctx: GraphQLContext) {
  let source = 0
  let theUid = ''

  if (fromURL.includes('weibo.com')) {
    theUid = fromID
    source = VENUS_SOURCE_WEIBO
  }

  if (fromURL.startsWith('https://www.xiaohongshu.com')) {
    if (fromID.startsWith('https://www.xiaohongshu.com/discovery/item/')) {
      const pathList = fromID.split('/')
      theUid = pathList[pathList.length - 1]
    } else {
      theUid = fromID
    }
    source = VENUS_SOURCE_RED
  }

  if (fromURL.includes('zhihu.com')) {
    theUid = fromID
    source = VENUS_SOURCE_ZHIHU
  }

  if (!theUid || source === 0) return

  const cacheKey = `venus:${theUid}`
  const cached = await cacheGet<boolean>(cacheKey)
  if (cached) return

  const [existing] = await ctx.db
    .select({ id: venus.id })
    .from(venus)
    .where(and(eq(venus.source, source), eq(venus.uid, theUid)))
    .limit(1)

  if (!existing) {
    await ctx.db.insert(venus).values({
      uid: theUid,
      source,
      name: '',
      avatar: '',
      bio: '',
      rawData: '',
      initLoad: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).onConflictDoNothing()
  }

  await cacheSet(cacheKey, true, 600) // 10 minutes
}

export const cellResolvers = {
  Query: {
    girls: async (
      _: unknown,
      args: { take: number; from?: number | null; hideOnly: boolean; last?: string | null; venusId?: number | null },
      ctx: GraphQLContext
    ) => {
      const user = ensureUser(ctx)

      const remaining = await getCellsFetchCountRemaining(user)
      if (remaining < 1) {
        throw new GraphQLError('Too many requests', { extensions: { code: 429 } })
      }

      if (args.last == null) {
        throw new GraphQLError('last is required', { extensions: { code: 400 } })
      }

      const lastID = parseInt(args.last, 10)
      if (isNaN(lastID)) {
        throw new GraphQLError('Invalid last ID', { extensions: { code: 400 } })
      }

      const permission = args.hideOnly ? 3 : 2

      const conditions = [
        eq(cells.permission, permission),
        lt(cells.id, lastID),
      ]

      if (args.venusId != null) {
        conditions.push(eq(cells.venusId, args.venusId))
      }

      if (args.from != null && args.from > 0) {
        conditions.push(eq(cells.cate, args.from))
      }

      const rows = await ctx.db
        .select()
        .from(cells)
        .where(and(...conditions))
        .orderBy(desc(cells.createdAt))
        .limit(args.take)

      const result = []
      for (const row of rows) {
        result.push(await resolveGirlFields(row, user, ctx))
      }
      return result
    },

    cell: async (
      _: unknown,
      args: { id: number },
      ctx: GraphQLContext
    ) => {
      const user = ensureUser(ctx)

      const remaining = await getCellsFetchCountRemaining(user)
      if (remaining < 1) {
        throw new GraphQLError('Too many requests', { extensions: { code: 429 } })
      }

      const [row] = await ctx.db
        .select()
        .from(cells)
        .where(eq(cells.id, args.id))
        .limit(1)

      if (!row) {
        throw new GraphQLError('Cell not found', { extensions: { code: 404 } })
      }

      return resolveGirlFields(row, user, ctx)
    },

    publicCells: async (
      _: unknown,
      args: { category: number; take: number; last: number },
      ctx: GraphQLContext
    ) => {
      const realIP = ctx.request.headers.get('X-Real-IP') || 'unknown'

      const { remaining } = await rateLimit(`ratelimit:ipcells:${realIP}`, 3, 60)
      if (remaining < 1) {
        throw new GraphQLError('Too many requests', { extensions: { code: 429 } })
      }

      const conditions = [
        eq(cells.permission, 2),
        lt(cells.id, args.last),
      ]

      if (args.category > 0) {
        conditions.push(eq(cells.cate, args.category))
      }

      const rows = await ctx.db
        .select()
        .from(cells)
        .where(and(...conditions))
        .orderBy(desc(cells.createdAt))
        .limit(args.take)

      // Public cells use a dummy user with no special permissions
      const dummyUser: UserRecord = {
        id: -1,
        email: 'testing.0a1964f087615a4581972fec9@annatarhe.com',
        pwd: '',
        name: '',
        phone: '',
        avatar: '',
        role: 0,
        bio: '',
        appleId: '',
        createdAt: new Date(0),
        updatedAt: new Date(0),
      }

      const result = []
      for (const row of rows) {
        result.push(await resolveGirlFields(row, dummyUser, ctx))
      }
      return result
    },

    dislikes: async (
      _: unknown,
      args: { from: number; size: number },
      ctx: GraphQLContext
    ) => {
      if (args.size > 50) {
        throw new GraphQLError('Invalid params', { extensions: { code: 400 } })
      }

      const user = ensureUser(ctx)

      if ((user.role ?? 0) < ROLE_ADMIN) {
        throw new GraphQLError('Insufficient permissions', { extensions: { code: 403 } })
      }

      const rows = await ctx.db
        .select({
          id: cells.id,
          img: cells.img,
          text: cells.text,
          cate: cells.cate,
          permission: cells.permission,
          createdAt: cells.createdAt,
          fromUrl: cells.fromUrl,
          fromId: cells.fromId,
          content: cells.content,
          venusId: cells.venusId,
          createdBy: cells.createdBy,
          md5: cells.md5,
        })
        .from(cells)
        .innerJoin(collections, eq(collections.cell, cells.id))
        .where(eq(collections.isDislike, true))
        .orderBy(desc(collections.id))
        .offset(args.from)
        .limit(args.size)

      const result = []
      for (const row of rows) {
        result.push(await resolveGirlFields(row, null, ctx))
      }
      return result
    },
  },

  Mutation: {
    addGirls: async (
      _: unknown,
      args: { cells: Array<{ img: string; text: string; cate: number; permission: number; fromID: string; fromURL: string }> },
      ctx: GraphQLContext
    ) => {
      const user = ensureUser(ctx)

      if ((user.role ?? 0) < ROLE_NORMAL) {
        throw new GraphQLError('Payment required', { extensions: { code: 402 } })
      }

      if (args.cells.length < 1) {
        throw new GraphQLError('Data cells is empty', { extensions: { code: 400 } })
      }

      if (args.cells.length > 200) {
        throw new GraphQLError('Data too long', { extensions: { code: 400 } })
      }

      // Collect fromIDs for weibo cells to look up venus entries
      const fromIDList: string[] = []
      for (const c of args.cells) {
        if (!c.fromURL.startsWith('https://weibo.com/')) continue
        if (!fromIDList.includes(c.fromID)) {
          fromIDList.push(c.fromID)
        }
      }

      // Look up existing venus entries
      let venusMap: Record<string, number> = {}
      if (fromIDList.length > 0) {
        const vs = await ctx.db
          .select()
          .from(venus)
          .where(inArray(venus.uid, fromIDList))

        for (const v of vs) {
          venusMap[v.uid] = v.id
        }
      }

      // Build values for bulk insert
      const insertValues = args.cells
        .filter(c => c.img && c.fromURL)
        .map(c => ({
          img: c.img,
          text: c.text,
          cate: c.cate,
          permission: c.permission,
          fromId: c.fromID,
          fromUrl: c.fromURL,
          createdBy: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
          content: c.text,
          venusId: venusMap[c.fromID] ?? -1,
          md5: sha256Encode(c.img),
        }))

      if (insertValues.length > 0) {
        await ctx.db
          .insert(cells)
          .values(insertValues)
          .onConflictDoNothing()
      }

      // Fire async venus checks
      for (const c of args.cells) {
        asyncCheckVenus(c.fromURL, c.fromID, ctx).catch(() => {})
      }

      // Return the inserted cells (re-query to get IDs)
      const result = []
      for (const c of args.cells.filter(c => c.img && c.fromURL)) {
        const [row] = await ctx.db
          .select()
          .from(cells)
          .where(eq(cells.img, c.img))
          .limit(1)
        if (row) {
          result.push(await resolveGirlFields(row, user, ctx))
        }
      }

      return result
    },

    removeGirl: async (
      _: unknown,
      args: { cells: string[]; toRemove: boolean },
      ctx: GraphQLContext
    ) => {
      const user = ensureUser(ctx)

      if ((user.role ?? 0) < ROLE_PAID) {
        throw new GraphQLError('Payment required', { extensions: { code: 402 } })
      }

      for (const idStr of args.cells) {
        const itemID = parseInt(idStr, 10)
        if (isNaN(itemID)) {
          throw new GraphQLError('Invalid cell ID', { extensions: { code: 400 } })
        }

        if ((user.role ?? 0) < ROLE_ADMIN) {
          // Non-admin users can only dislike (soft-hide)
          await ctx.db
            .insert(collections)
            .values({
              cell: itemID,
              owner: user.id,
              isDislike: true,
            })
        } else {
          // Admin: actually remove or hide
          if (args.toRemove) {
            await ctx.db.delete(cells).where(eq(cells.id, itemID))
          } else {
            await ctx.db
              .update(cells)
              .set({ permission: 3, updatedAt: new Date() })
              .where(eq(cells.id, itemID))
          }
        }
      }

      return { isOk: true }
    },
  },
}
