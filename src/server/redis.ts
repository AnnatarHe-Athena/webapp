import Redis from 'ioredis'

let redis: Redis | null = null

export function getRedis(): Redis {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')
  }
  return redis
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  const data = await getRedis().get(key)
  if (!data) return null
  return JSON.parse(data) as T
}

export async function cacheSet(key: string, value: unknown, ttlSeconds: number): Promise<void> {
  await getRedis().setex(key, ttlSeconds, JSON.stringify(value))
}

export async function cacheDel(key: string): Promise<void> {
  await getRedis().del(key)
}

/**
 * Rate limiting using Redis INCR + EXPIRE.
 * Returns whether the request is allowed and remaining requests in the window.
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number }> {
  const r = getRedis()
  const current = await r.incr(key)
  if (current === 1) {
    await r.expire(key, windowSeconds)
  }
  const remaining = Math.max(0, limit - current)
  return { allowed: current <= limit, remaining }
}
