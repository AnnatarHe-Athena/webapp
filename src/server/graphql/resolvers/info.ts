import { count as drizzleCount } from 'drizzle-orm'
import { users, cells } from '@/db/schema'
import { cacheGet, cacheSet } from '@/server/redis'
import type { GraphQLContext } from '../context'

const USER_COUNT_CACHE_KEY = 'app:opendata:info:usercount'
const CELL_COUNT_CACHE_KEY = 'app:opendata:info:cellcount'
const CACHE_TTL = 24 * 60 * 60 // 24 hours

export const infoResolvers = {
  Query: {
    info: async (_: unknown, __: unknown, ctx: GraphQLContext) => {
      // User count with caching
      let userCount = await cacheGet<number>(USER_COUNT_CACHE_KEY)
      if (userCount == null) {
        const [result] = await ctx.db
          .select({ value: drizzleCount() })
          .from(users)
        userCount = result?.value ?? 0
        await cacheSet(USER_COUNT_CACHE_KEY, userCount, CACHE_TTL)
      }

      // Cell count with caching
      let cellCount = await cacheGet<number>(CELL_COUNT_CACHE_KEY)
      if (cellCount == null) {
        const [result] = await ctx.db
          .select({ value: drizzleCount() })
          .from(cells)
        cellCount = result?.value ?? 0
        await cacheSet(CELL_COUNT_CACHE_KEY, cellCount, CACHE_TTL)
      }

      return {
        userCount,
        cellCount,
        fee: 'nil',
        email: 'iamhele1994@gmail.com',
        copyright: 'AnnatarHe',
      }
    },
  },
}
