# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Athena - Full-stack image curation platform built as a single Next.js 16 application with Bun runtime. Includes both frontend (React) and backend (GraphQL API via graphql-yoga) in one project.

## Tech Stack

- **Runtime**: Bun
- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19, Apollo Client 4, TailwindCSS v4
- **Backend**: graphql-yoga (GraphQL API in Next.js API routes)
- **Database**: PostgreSQL via Drizzle ORM
- **Cache**: Redis via ioredis
- **Auth**: JWT (HS512) + AES-256-CFB encryption, Apple Sign-In
- **Email**: Resend
- **Monitoring**: Sentry (`@sentry/nextjs`)

## Commands

```bash
bun install              # Install dependencies
bun run dev              # Start dev server on port 4399 (Turbopack)
bun run build            # Production build
bun run start            # Start production server
bun run lint             # Run oxlint
bun run lint:fix         # Run oxlint with auto-fix
bun run format           # Format code with oxfmt
bun run format:check     # Check formatting
bun run test             # Run vitest (interactive watch mode)
bun run test -- --run    # Run tests once (CI mode)
bun run test -- src/path/to/file.test.ts  # Run a single test file
bun run db:generate      # Generate Drizzle migrations
bun run db:studio        # Open Drizzle Studio
```

## Architecture

### Data Flow
```
Frontend (Apollo Client) -> /api/graphql (graphql-yoga) -> Resolvers -> Drizzle ORM -> PostgreSQL
                                                                    -> Redis (caching, rate limiting)
```

### Key Directories
- `src/app/` - Next.js pages (App Router) and API routes
- `src/app/api/graphql/route.ts` - Single GraphQL endpoint (graphql-yoga, handles GET + POST)
- `src/server/graphql/schema.ts` - GraphQL type definitions (all types defined here)
- `src/server/graphql/resolvers/` - Resolvers organized by domain (auth, user, cell, category, collection, venus, pay, verify, info)
- `src/server/graphql/context.ts` - Request context: parses auth token, provides `db`, `user`, `request`
- `src/server/` - Server-only business logic (auth, crypto, redis, config, mail, apple auth)
- `src/db/schema.ts` - Drizzle ORM schema (maps to existing PostgreSQL tables, no migrations)
- `src/service/` - Apollo Client setup (separate configs for client-side and server-side SSR)
- `src/schema/` - GraphQL mutation/query documents (codegen targets)
- `src/components/` - React components organized by feature
- `src/i18n/` - i18next with browser language detection

### GraphQL Resolver Pattern

Each domain has its own resolver file in `src/server/graphql/resolvers/`. Resolvers access the database via `context.db` (Drizzle) and the current user via `context.user`. The context is built per-request in `context.ts`, which reads the auth token from either `Authorization` or `athena-token` header.

### Authentication & Encryption

- JWT tokens are wrapped with AES-256-CFB encryption before being sent to clients
- Tokens are cached in Redis and validated per-request
- Four user roles: Admin(150), Medium(120), Paid(100), Normal(80) — higher number = more access
- Cell images are encrypted at rest using AES-256-CFB with user email as the key derivation source
- Client-side decryption happens in `src/utils/crypto.ts`
- Rate limiting: 10 requests/min for unpaid users, enforced via Redis INCR + EXPIRE

### Apollo Client

- **Client-side** (`src/service/apollo.client.ts`): HTTP link + auth link (token from cookies) + error link (react-hot-toast)
- **Server-side** (`src/service/apollo.server.ts`): Reads token from cookies for SSR, per-request client
- **Cache**: InMemoryCache with custom merge policies for paginated `girls` query

### Database

PostgreSQL with Drizzle ORM. Schema in `src/db/schema.ts` maps to existing tables — no migrations are used. Key tables: `users`, `cells` (images), `categories`, `collections`, `venus` (creators), `purchases`, `tags`, `tags_girls`.

### Environment Configuration

Validated via Zod in `src/server/config.ts`. Required: `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET`. Optional: `RESEND_API_KEY`, `CF_TURNSTILE_SECRET`, Apple auth config, `S3_DOMAIN`, `ROOT_TOKENS`.

## Conventions

- Single quotes, no semicolons, 2-space indent
- Linting: oxlint; Formatting: oxfmt
- Default exports for React components
- Dark mode first (TailwindCSS)
- Server Components by default, `'use client'` only for interactive components
- Path alias: `@/*` maps to `./src/*`
- Tests use Vitest + happy-dom, placed alongside source as `*.test.{ts,tsx}`
