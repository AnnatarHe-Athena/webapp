import { NextRequest, NextResponse } from 'next/server'

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'https://dbg-api.annatarhe.com'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const code = formData.get('code') as string
  const idToken = formData.get('id_token') as string
  const state = formData.get('state') as string

  // Forward to backend API
  const response = await fetch(`${API_HOST}/graphql/v1`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query LoginByApple($payload: appleVerifyPayload!) {
        loginByApple(payload: $payload) {
          token
          refreshToken
          id
        }
      }`,
      variables: {
        payload: {
          code,
          idToken: idToken || '',
          state: state || '',
          platform: 'web',
        },
      },
    }),
  })

  const data = await response.json()

  if (data.data?.loginByApple) {
    const { token, refreshToken, id } = data.data.loginByApple
    const domain = '.annatarhe.com'
    const maxAge = 365 * 24 * 60 * 60

    const res = NextResponse.redirect(new URL(`/users/${id}`, request.url))
    res.cookies.set('athena:token', token, { maxAge, domain, path: '/', sameSite: 'lax' })
    res.cookies.set('athena:refreshToken', refreshToken, { maxAge, domain, path: '/', sameSite: 'lax' })
    res.cookies.set('athena:uid', id, { maxAge, domain, path: '/', sameSite: 'lax' })
    return res
  }

  return NextResponse.redirect(new URL('/auth?error=apple_auth_failed', request.url))
}
