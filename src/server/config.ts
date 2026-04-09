import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  JWT_SECRET: z.string(),
  RESEND_API_KEY: z.string().optional(),
  CF_TURNSTILE_SECRET: z.string().optional(),
  S3_DOMAIN: z.string().default('https://cdn-lc.annatarhe.cn'),
  APPLE_TEAM_ID: z.string().optional(),
  APPLE_SERVICE_ID: z.string().optional(),
  APPLE_BUNDLE_ID: z.string().optional(),
  APPLE_KEY_ID: z.string().optional(),
  APPLE_KEY_SECRET: z.string().optional(),
  ROOT_TOKENS: z.string().optional().transform(v => v ? v.split(',') : []),
})

export const env = envSchema.parse(process.env)
