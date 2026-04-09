import { SignJWT, decodeJwt } from 'jose'

export interface AppleAuthResponse {
  unique: string
  email: string
  emailVerified: boolean
  isPrivateEmail: boolean
}

interface AppleTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  id_token: string
  error?: string
}

/**
 * Generates an Apple client_secret JWT using the P8 private key.
 * The client_secret is a signed JWT with ES256, valid for 6 months.
 * Matches Go: apple.GenerateClientSecret
 */
async function generateClientSecret(
  p8Key: string,
  teamId: string,
  clientId: string,
  keyId: string
): Promise<string> {
  // Parse the P8 key (PEM-encoded EC private key)
  const pemContent = p8Key
    .replace(/-----BEGIN PRIVATE KEY-----/g, '')
    .replace(/-----END PRIVATE KEY-----/g, '')
    .replace(/\s/g, '')
  const keyData = Buffer.from(pemContent, 'base64')

  const privateKey = await crypto.subtle.importKey(
    'pkcs8',
    keyData,
    { name: 'ECDSA', namedCurve: 'P-256' },
    true,
    ['sign']
  )

  const now = Math.floor(Date.now() / 1000)

  const jwt = await new SignJWT({})
    .setProtectedHeader({ alg: 'ES256', kid: keyId })
    .setIssuer(teamId)
    .setIssuedAt(now)
    .setExpirationTime(now + 15777000) // ~6 months
    .setAudience('https://appleid.apple.com')
    .setSubject(clientId)
    .sign(privateKey)

  return jwt
}

/**
 * Exchanges an authorization code for Apple tokens.
 */
async function exchangeCode(
  code: string,
  clientId: string,
  clientSecret: string,
  redirectUri?: string
): Promise<AppleTokenResponse> {
  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    code,
    grant_type: 'authorization_code',
  })
  if (redirectUri) {
    params.set('redirect_uri', redirectUri)
  }

  const resp = await fetch('https://appleid.apple.com/auth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })

  if (!resp.ok) {
    const body = await resp.text()
    throw new Error(`Apple token exchange failed (${resp.status}): ${body}`)
  }

  return resp.json() as Promise<AppleTokenResponse>
}

/**
 * Parses an Apple ID token to extract user information.
 * Matches Go: appleService.GetUserInfo
 */
function getUserInfoFromIdToken(idToken: string): AppleAuthResponse {
  const claims = decodeJwt(idToken)

  const email = claims.email as string | undefined
  if (!email) {
    throw new Error('email not found in Apple ID token')
  }

  const unique = claims.sub
  if (!unique) {
    throw new Error('unique ID (sub) not found in Apple ID token')
  }

  const emailVerified = claims.email_verified === 'true' || claims.email_verified === true
  const isPrivateEmail = claims.is_private_email === 'true' || claims.is_private_email === true

  return {
    unique,
    email,
    emailVerified: emailVerified ?? true,
    isPrivateEmail: isPrivateEmail ?? true,
  }
}

/**
 * Performs Apple Sign-In for web clients.
 * Matches Go: appleService.DoWebAuth
 */
export async function doWebAuth(code: string): Promise<AppleAuthResponse> {
  const teamId = process.env.APPLE_TEAM_ID
  const serviceId = process.env.APPLE_SERVICE_ID
  const keyId = process.env.APPLE_KEY_ID
  const keySecret = process.env.APPLE_KEY_SECRET

  if (!teamId || !serviceId || !keyId || !keySecret) {
    throw new Error('Apple Sign-In not configured')
  }

  const feHost = process.env.NEXT_PUBLIC_FE_HOST || 'https://athena.annatarhe.com'
  const redirectUri = `${feHost}/auth/apple/callback`

  const clientSecret = await generateClientSecret(keySecret, teamId, serviceId, keyId)

  const tokenResp = await exchangeCode(code, serviceId, clientSecret, redirectUri)

  if (tokenResp.error) {
    throw new Error(`Apple validation error: ${tokenResp.error}`)
  }

  return getUserInfoFromIdToken(tokenResp.id_token)
}

/**
 * Performs Apple Sign-In for native app clients.
 * Matches Go: appleService.DoAppAuth
 */
export async function doAppAuth(code: string): Promise<AppleAuthResponse> {
  const teamId = process.env.APPLE_TEAM_ID
  const serviceId = process.env.APPLE_SERVICE_ID
  const keyId = process.env.APPLE_KEY_ID
  const keySecret = process.env.APPLE_KEY_SECRET

  if (!teamId || !serviceId || !keyId || !keySecret) {
    throw new Error('Apple Sign-In not configured')
  }

  const clientSecret = await generateClientSecret(keySecret, teamId, serviceId, keyId)

  const tokenResp = await exchangeCode(code, serviceId, clientSecret)

  if (tokenResp.error) {
    throw new Error(`Apple validation error: ${tokenResp.error}`)
  }

  return getUserInfoFromIdToken(tokenResp.id_token)
}
