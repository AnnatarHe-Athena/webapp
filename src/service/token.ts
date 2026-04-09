export const STORAGE_TOKEN_KEY = 'athena:token'
export const STORAGE_REFRESH_TOKEN_KEY = 'athena:refreshToken'
export const STORAGE_UID_KEY = 'athena:uid'

export function setTokens(token: string, refreshToken: string, uid: string) {
  const maxAge = 365 * 24 * 60 * 60 // 1 year
  const domain = typeof window !== 'undefined' && window.location.hostname.includes('annatarhe')
    ? '.annatarhe.com'
    : undefined

  document.cookie = `${STORAGE_TOKEN_KEY}=${token}; max-age=${maxAge}; path=/; ${domain ? `domain=${domain};` : ''} SameSite=Lax`
  document.cookie = `${STORAGE_REFRESH_TOKEN_KEY}=${refreshToken}; max-age=${maxAge}; path=/; ${domain ? `domain=${domain};` : ''} SameSite=Lax`
  document.cookie = `${STORAGE_UID_KEY}=${uid}; max-age=${maxAge}; path=/; ${domain ? `domain=${domain};` : ''} SameSite=Lax`
}

export function clearTokens() {
  document.cookie = `${STORAGE_TOKEN_KEY}=; max-age=0; path=/`
  document.cookie = `${STORAGE_REFRESH_TOKEN_KEY}=; max-age=0; path=/`
  document.cookie = `${STORAGE_UID_KEY}=; max-age=0; path=/`
}

export function getToken(): string {
  if (typeof document === 'undefined') return ''
  return document.cookie.split('; ').find(c => c.startsWith(STORAGE_TOKEN_KEY + '='))?.split('=')[1] || ''
}

export function getUid(): string {
  if (typeof document === 'undefined') return ''
  return document.cookie.split('; ').find(c => c.startsWith(STORAGE_UID_KEY + '='))?.split('=')[1] || ''
}
