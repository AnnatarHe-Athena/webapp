import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { rateLimit } from '@/server/redis'
import { tokenParser, ROLE_ADMIN, ROLE_NORMAL } from '@/server/auth'
import { GraphQLError } from 'graphql'

export type UserRecord = typeof users.$inferSelect

export interface GraphQLContext {
  db: typeof db
  user: UserRecord | null
  request: Request
}

export async function createContext({ request }: { request: Request }): Promise<GraphQLContext> {
  let token = request.headers.get('Authorization') || request.headers.get('athena-token') || ''

  if (token.startsWith('Bearer ')) token = token.slice(7)

  let user: UserRecord | null = null

  const rootTokens = (process.env.ROOT_TOKENS || '').split(',').filter(Boolean)
  const isRoot = rootTokens.includes(token)

  if (isRoot) {
    user = {
      id: 1 << 26,
      email: 'root@annatarhe.com',
      name: 'root',
      pwd: '',
      phone: '',
      avatar: '',
      bio: '',
      role: ROLE_ADMIN,
      appleId: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  } else if (token && token.length > 3) {
    try {
      const jwtContent = await tokenParser(token, process.env.JWT_SECRET!)
      const [u] = await db.select().from(users).where(eq(users.id, jwtContent.id)).limit(1)
      if (u) user = u
    } catch {
      // invalid token - proceed as anonymous
    }
  }

  if (user && (user.role ?? 0) < ROLE_NORMAL) {
    const { allowed } = await rateLimit(`limiter:user:${user.id}`, 10, 60)
    if (!allowed) {
      throw new GraphQLError('Too many requests', { extensions: { code: 429 } })
    }
  }

  return { db, user, request }
}
