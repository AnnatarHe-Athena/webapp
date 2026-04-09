import { SignJWT, jwtVerify } from 'jose'
import { getKeyFromUserEmail, encrypt, decrypt } from './crypto'
import { cacheGet, cacheSet, cacheDel } from './redis'

// Role constants matching Go: RoleAdmin, RoleMedium, RolePaid, RoleNormal
export const ROLE_ADMIN = 150
export const ROLE_MEDIUM = 120
export const ROLE_PAID = 100
export const ROLE_NORMAL = 80

// Platform types matching Go: ClientPlatform
export type ClientPlatform = 'android' | 'ios' | 'web' | 'app3p'

// JWT token category matching Go: JwtTokenCategory
export type JwtTokenCategory = 'user' | 'app'

// Claims stored in JWT and Redis
export interface TokenClaims {
  userId: number
  deviceId: string
  platform: ClientPlatform
  cate: JwtTokenCategory
  exp: number
  iss: string
}

// Parsed token content returned from TokenParser
export interface JWTContent {
  id: number
  platform: ClientPlatform
  cate: JwtTokenCategory
}

// Device info for token generation
export interface InputDevice {
  os: string
  version: string
  appVersion: string
  id: string
  lang: string
}

// The constant AES key used to encrypt/decrypt tokens
// Matches Go: tokenEncryptAESKey
const TOKEN_ENCRYPT_AES_KEY = '0e635f3fbcf9c2fa6cb2'

// Token TTLs matching Go: tokenAliveDuration
const TOKEN_TTL_SECONDS = 365 * 24 * 60 * 60
const REFRESH_TOKEN_TTL_SECONDS = 730 * 24 * 60 * 60

function getTokenCacheKey(token: string): string {
  return `token:${token}`
}

function getLastUserTokenKey(uid: number, platform: ClientPlatform, cate: JwtTokenCategory): string {
  return `token:${uid}:${platform}:${cate}`
}

function getRefreshTokenCacheKey(refreshToken: string): string {
  return `refreshToken:${refreshToken}`
}

/**
 * Creates an encrypted token string from JWT claims.
 * Token format: base64(AES-CFB-encrypt(base64(JWT-HS512-sign)))
 * Matches Go: getTokenWithClaims
 */
async function getTokenWithClaims(
  claims: TokenClaims,
  jwtSecret: string
): Promise<string> {
  const secretKey = new TextEncoder().encode(jwtSecret)

  const jwt = await new SignJWT({
    userId: claims.userId,
    deviceId: claims.deviceId,
    platform: claims.platform,
    cate: claims.cate,
  })
    .setProtectedHeader({ alg: 'HS512' })
    .setExpirationTime(claims.exp)
    .setIssuer(claims.iss)
    .sign(secretKey)

  const jwtBase64 = Buffer.from(jwt, 'utf-8').toString('base64')
  const aesKey = getKeyFromUserEmail(TOKEN_ENCRYPT_AES_KEY)
  const encrypted = encrypt(aesKey, Buffer.from(jwtBase64, 'utf-8'))
  return encrypted.toString('base64')
}

/**
 * Generates a new access token + refresh token pair.
 * Invalidates the previously issued token for the same user/platform/category.
 * Matches Go: GenToken
 */
export async function genToken(
  id: number,
  platform: ClientPlatform,
  device: InputDevice,
  jwtSecret: string
): Promise<{ token: string; refreshToken: string }> {
  if (!platform) {
    throw new Error('platform invalid')
  }

  const cate: JwtTokenCategory = 'user'
  const now = Math.floor(Date.now() / 1000)

  const claims: TokenClaims = {
    userId: id,
    deviceId: device.id,
    platform,
    cate,
    exp: now + TOKEN_TTL_SECONDS,
    iss: 'dexp',
  }

  const refreshClaims: TokenClaims = {
    userId: id,
    deviceId: device.id,
    platform,
    cate,
    exp: now + REFRESH_TOKEN_TTL_SECONDS,
    iss: 'dexp',
  }

  const token = await getTokenWithClaims(claims, jwtSecret)
  const refreshToken = await getTokenWithClaims(refreshClaims, jwtSecret)

  const lastTokenKey = getLastUserTokenKey(id, platform, cate)

  // Invalidate previously issued token for this user/platform/category
  const lastToken = await cacheGet<string>(lastTokenKey)
  if (lastToken) {
    await cacheDel(getTokenCacheKey(lastToken))
  }

  // Store the new last token reference
  await cacheSet(lastTokenKey, token, TOKEN_TTL_SECONDS)

  // Cache the token claims
  await cacheSet(getTokenCacheKey(token), claims, TOKEN_TTL_SECONDS)

  // Cache the refresh token claims
  await cacheSet(getRefreshTokenCacheKey(refreshToken), refreshClaims, REFRESH_TOKEN_TTL_SECONDS)

  return { token, refreshToken }
}

/**
 * Parses and validates a token string, returning the JWT content.
 * Checks token against Redis cache, then decrypts and verifies the JWT.
 * Matches Go: TokenParser
 */
export async function tokenParser(
  tokenString: string,
  jwtSecret: string
): Promise<JWTContent> {
  const defaultContent: JWTContent = {
    id: -1,
    platform: 'web',
    cate: 'user',
  }

  if (tokenString.length < 6) {
    throw new Error('unauthorized')
  }

  // Check token exists in Redis cache
  const cachedClaims = await cacheGet<TokenClaims>(getTokenCacheKey(tokenString))
  if (!cachedClaims) {
    throw new Error('token not found in cache')
  }

  // Decrypt the token
  const tokenBytes = Buffer.from(tokenString, 'base64')
  const aesKey = getKeyFromUserEmail(TOKEN_ENCRYPT_AES_KEY)
  const decrypted = decrypt(aesKey, tokenBytes)
  const jwtString = Buffer.from(decrypted.trim(), 'base64').toString('utf-8')

  // Verify the JWT
  const secretKey = new TextEncoder().encode(jwtSecret)
  const { payload } = await jwtVerify(jwtString, secretKey, {
    algorithms: ['HS512'],
  })

  const content: JWTContent = {
    id: payload.userId as number,
    platform: payload.platform as ClientPlatform,
    cate: (payload.cate as JwtTokenCategory) || 'user',
  }

  // Verify cached claims match the JWT
  if (cachedClaims.userId !== content.id) {
    throw new Error('token mismatch')
  }

  return content
}

/**
 * Validates a refresh token and generates a new token pair.
 * Matches Go: RefreshTheToken
 */
export async function refreshTheToken(
  refreshToken: string,
  platform: ClientPlatform,
  device: InputDevice,
  jwtSecret: string
): Promise<{ uid: number; token: string; refreshToken: string }> {
  const refreshTokenCacheKey = getRefreshTokenCacheKey(refreshToken)

  // Check refresh token exists in cache
  const cachedClaims = await cacheGet<TokenClaims>(refreshTokenCacheKey)
  if (!cachedClaims) {
    throw new Error('refresh token not found')
  }

  // Decrypt and verify the refresh token JWT
  const tokenBytes = Buffer.from(refreshToken, 'base64')
  const aesKey = getKeyFromUserEmail(TOKEN_ENCRYPT_AES_KEY)
  const decrypted = decrypt(aesKey, tokenBytes)
  const jwtString = Buffer.from(decrypted.trim(), 'base64').toString('utf-8')

  const secretKey = new TextEncoder().encode(jwtSecret)
  const { payload } = await jwtVerify(jwtString, secretKey, {
    algorithms: ['HS512'],
  })

  const uid = payload.userId as number
  const refreshPlatform = payload.platform as ClientPlatform

  if (refreshPlatform !== platform) {
    throw new Error('platform invalid')
  }

  // Generate new token pair
  const result = await genToken(uid, platform, device, jwtSecret)

  // Delete the old refresh token
  await cacheDel(refreshTokenCacheKey)

  return { uid, ...result }
}

/**
 * Invalidates a token by removing it from the cache.
 * Matches Go: InvalidateToken
 */
export async function invalidateToken(tokenString: string): Promise<void> {
  await cacheDel(getTokenCacheKey(tokenString))
}

/**
 * Invalidates all tokens for a user/platform combination.
 * Matches Go: InvalidateUserTokens
 */
export async function invalidateUserTokens(
  uid: number,
  platform: ClientPlatform
): Promise<void> {
  const cate: JwtTokenCategory = 'user'
  const lastTokenKey = getLastUserTokenKey(uid, platform, cate)

  const lastToken = await cacheGet<string>(lastTokenKey)
  if (lastToken) {
    await cacheDel(getTokenCacheKey(lastToken))
  }
  await cacheDel(lastTokenKey)
}

/**
 * Checks if the given token is a root admin token.
 * Matches Go: EnsureRootToken
 */
export function ensureRootToken(token: string, rootTokens: string[]): boolean {
  return rootTokens.includes(token)
}
