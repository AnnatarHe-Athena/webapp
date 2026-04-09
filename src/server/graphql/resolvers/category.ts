import { asc } from 'drizzle-orm'
import { categories } from '@/db/schema'
import { cacheGet, cacheSet } from '@/server/redis'
import type { GraphQLContext } from '../context'

const CATEGORIES_CACHE_KEY = 'cache:categories'
const CACHE_TTL = 24 * 60 * 60 // 24 hours

export const categoryResolvers = {
  Query: {
    categories: async (_: unknown, __: unknown, ctx: GraphQLContext) => {
      // Try cache first
      const cached = await cacheGet<Array<{ id: number; name: string; src: number; count: number }>>(CATEGORIES_CACHE_KEY)
      if (cached && cached.length > 0) {
        return cached.map(c => ({
          id: String(c.id),
          name: c.name,
          src: c.src,
          count: c.count,
        }))
      }

      const rows = await ctx.db
        .select()
        .from(categories)
        .orderBy(asc(categories.id))

      const result = rows.map(c => ({
        id: String(c.id),
        name: c.name,
        src: c.src ?? 0,
        count: 0,
      }))

      // Cache the raw data
      await cacheSet(CATEGORIES_CACHE_KEY, rows.map(c => ({
        id: c.id,
        name: c.name,
        src: c.src ?? 0,
        count: 0,
      })), CACHE_TTL)

      return result
    },
  },
}
