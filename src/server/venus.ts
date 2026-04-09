import { db } from '@/db'
import { venus } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { cacheGet, cacheSet } from './redis'

// Venus source constants matching Go: venusSource* iota
const VENUS_SOURCE_WEIBO = 1
const VENUS_SOURCE_RED = 2
// const VENUS_SOURCE_JIKE = 3
const VENUS_SOURCE_ZHIHU = 4
// const VENUS_SOURCE_DOUBAN = 5
// const VENUS_SOURCE_INSTGREAM = 6

/**
 * Checks if a venus (creator) entry exists for the given source URL/ID.
 * If not, creates one. Uses Redis cache to avoid redundant DB lookups.
 * Matches Go: asyncCheckVenus
 */
export async function asyncCheckVenus(fromURL: string, fromID: string): Promise<void> {
  let source = 0
  let theUid = ''

  if (fromURL.includes('weibo.com')) {
    theUid = fromID
    source = VENUS_SOURCE_WEIBO
  }

  if (fromURL.startsWith('https://www.xiaohongshu.com')) {
    if (fromID.startsWith('https://www.xiaohongshu.com/discovery/item/')) {
      const pathList = fromID.split('/')
      theUid = pathList[pathList.length - 1] || ''
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

  const existing = await db.select({ id: venus.id })
    .from(venus)
    .where(and(eq(venus.source, source), eq(venus.uid, theUid)))
    .limit(1)

  if (existing.length === 0) {
    await db.insert(venus).values({
      uid: theUid,
      source,
      name: '',
      avatar: '',
      bio: '',
      rawData: '',
      initLoad: false,
    })
  }

  await cacheSet(cacheKey, true, 600) // 10 min
}
