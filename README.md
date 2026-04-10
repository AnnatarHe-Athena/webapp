# Athena

Full-stack image curation platform built with Next.js 16, Bun, and GraphQL.

## Tech Stack

- **Runtime**: Bun
- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19, Apollo Client 4, TailwindCSS v4
- **Backend**: graphql-yoga (API route at `/api/graphql`)
- **Database**: PostgreSQL (Drizzle ORM)
- **Cache**: Redis (ioredis)

## Getting Started

```bash
bun install
bun run dev      # http://localhost:4399
```

## Scripts

```bash
bun run build          # Production build
bun run lint           # Lint with oxlint
bun run format         # Format with oxfmt
bun run test           # Run tests (vitest)
bun run db:studio      # Open Drizzle Studio
```
