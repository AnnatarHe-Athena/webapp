import { GraphQLError } from 'graphql'
import { cacheSet } from '@/server/redis'
import { randString } from '@/server/crypto'
import { sendVerifyCode } from '@/server/mail'
import type { GraphQLContext } from '../context'

function getVerifyCodeKey(email: string): string {
  return `auth:verifyCode:${email}`
}

async function verifyCloudflareTurnstile(token: string): Promise<boolean> {
  const secret = process.env.CF_TURNSTILE_SECRET
  if (!secret) {
    console.warn('Cloudflare Turnstile secret not configured, skipping verification')
    return true
  }

  const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret,
      response: token,
    }),
  })

  if (!resp.ok) {
    throw new Error('Turnstile verification request failed')
  }

  const result = await resp.json() as { success: boolean }
  return result.success
}

export const verifyResolvers = {
  Mutation: {
    sendVerifyCode: async (
      _: unknown,
      args: { email: string; captcha: { cid: string; code: string } },
      ctx: GraphQLContext
    ) => {
      // Verify Cloudflare Turnstile captcha
      const ok = await verifyCloudflareTurnstile(args.captcha.code)
      if (!ok) {
        throw new GraphQLError('Captcha verification failed', { extensions: { code: 400 } })
      }

      // Generate a random 4-character code
      const code = randString(4)

      // Store in Redis with 1 hour TTL (NX = set if not exists)
      await cacheSet(getVerifyCodeKey(args.email), code, 3600)

      // Send the verify code via email
      const lang = ctx.request.headers.get('Accept-Language') || 'en'
      await sendVerifyCode(args.email, code, lang)

      return true
    },
  },
}
