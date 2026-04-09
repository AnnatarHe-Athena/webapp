import { GraphQLError } from 'graphql'
import { eq, and, lt, desc, count as drizzleCount } from 'drizzle-orm'
import { cells, collections } from '@/db/schema'
import { ROLE_PAID } from '@/server/auth'
import { getKeyFromUserEmail, encrypt } from '@/server/crypto'
import type { GraphQLContext, UserRecord } from '../context'

function ensureUser(ctx: GraphQLContext): UserRecord {
  if (!ctx.user) {
    throw new GraphQLError('Unauthorized', { extensions: { code: 401 } })
  }
  return ctx.user
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

export const collectionResolvers = {
  Query: {
    collections: async (
      _: unknown,
      args: { from: number; size: number; cursor: number },
      ctx: GraphQLContext
    ) => {
      if (args.size > 50) {
        throw new GraphQLError('Invalid params', { extensions: { code: 400 } })
      }

      const user = ensureUser(ctx)

      // Get total count
      const [countResult] = await ctx.db
        .select({ value: drizzleCount() })
        .from(collections)
        .where(and(
          eq(collections.owner, user.id),
          eq(collections.isDislike, false),
        ))

      const totalCount = countResult?.value ?? 0

      // Get edges with cursor-based pagination
      const collectionRows = await ctx.db
        .select()
        .from(collections)
        .where(and(
          eq(collections.owner, user.id),
          eq(collections.isDislike, false),
          lt(collections.id, args.cursor),
        ))
        .orderBy(desc(collections.id))
        .limit(args.size)

      // For each collection, fetch the associated cell
      const edges = []
      for (const col of collectionRows) {
        const [cellRow] = await ctx.db
          .select()
          .from(cells)
          .where(eq(cells.id, col.cell))
          .limit(1)

        if (!cellRow) continue

        const isPaid = (user.role ?? 0) >= ROLE_PAID
        const encryptedImg = encryptCellImage(cellRow.img, user.email)

        edges.push({
          id: col.id,
          cell: {
            id: String(cellRow.id),
            img: encryptedImg,
            text: cellRow.text ?? '',
            cate: cellRow.cate ?? 0,
            permission: cellRow.permission ?? 2,
            createdAt: Math.floor(cellRow.createdAt.getTime() / 1000),
            fromID: isPaid ? (cellRow.fromId ?? '') : '',
            fromURL: isPaid ? (cellRow.fromUrl ?? '') : '',
            content: cellRow.content ?? '',
            venus: {
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
            },
            isCollected: true,
          },
        })
      }

      return {
        count: totalCount,
        edges,
      }
    },
  },

  Mutation: {
    addCollection: async (
      _: unknown,
      args: { cells: string[] },
      ctx: GraphQLContext
    ) => {
      const user = ensureUser(ctx)

      if ((user.role ?? 0) < ROLE_PAID) {
        throw new GraphQLError('Payment required', { extensions: { code: 402 } })
      }

      for (const idStr of args.cells) {
        const cid = parseInt(idStr, 10)
        if (isNaN(cid)) {
          throw new GraphQLError('Invalid cell ID', { extensions: { code: 400 } })
        }

        await ctx.db
          .insert(collections)
          .values({
            cell: cid,
            owner: user.id,
            isDislike: false,
          })
      }

      return { isOk: true }
    },
  },
}
