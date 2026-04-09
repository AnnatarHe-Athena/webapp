import { GraphQLError } from 'graphql'
import { eq } from 'drizzle-orm'
import { users } from '@/db/schema'
import type { GraphQLContext } from '../context'

function ensureUser(ctx: GraphQLContext) {
  if (!ctx.user) {
    throw new GraphQLError('Unauthorized', { extensions: { code: 401 } })
  }
  return ctx.user
}

export const userResolvers = {
  Query: {
    users: async (
      _: unknown,
      args: { id?: string | null },
      ctx: GraphQLContext
    ) => {
      const me = ensureUser(ctx)
      let requestUserId = me.id

      if (args.id != null) {
        const parsed = parseInt(args.id, 10)
        if (isNaN(parsed)) {
          throw new GraphQLError('Invalid user ID', { extensions: { code: 400 } })
        }
        requestUserId = parsed
      }

      const [u] = await ctx.db
        .select()
        .from(users)
        .where(eq(users.id, requestUserId))
        .limit(1)

      if (!u) {
        throw new GraphQLError('User not found', { extensions: { code: 404 } })
      }

      return {
        id: String(u.id),
        email: u.email,
        name: u.name,
        pwd: '',
        avatar: u.avatar ?? '',
        bio: u.bio ?? '',
        role: u.role ?? 0,
        collections: '',
      }
    },
  },

  Mutation: {
    updateUserInfo: async (
      _: unknown,
      args: { username?: string | null; avatar?: string | null; bio?: string | null },
      ctx: GraphQLContext
    ) => {
      const self = ensureUser(ctx)

      const updates: Record<string, string> = {}
      if (args.username != null) updates.name = args.username
      if (args.avatar != null) updates.avatar = args.avatar
      if (args.bio != null) updates.bio = args.bio

      if (Object.keys(updates).length > 0) {
        await ctx.db
          .update(users)
          .set(updates)
          .where(eq(users.id, self.id))
      }

      // Re-fetch after update
      const [u] = await ctx.db
        .select()
        .from(users)
        .where(eq(users.id, self.id))
        .limit(1)

      const user = u || self

      return {
        id: String(user.id),
        email: user.email,
        name: user.name,
        pwd: '',
        avatar: user.avatar ?? '',
        bio: user.bio ?? '',
        role: user.role ?? 0,
        collections: '',
      }
    },
  },
}
