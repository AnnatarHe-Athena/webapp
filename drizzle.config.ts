import { defineConfig } from 'drizzle-kit'

const dbUrl = process.env.DATABASE_URL!

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: dbUrl,
  },
})

