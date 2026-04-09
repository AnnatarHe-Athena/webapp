# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

Athena - Full-stack image curation platform built as a single Next.js 16 application with Bun runtime. Includes both frontend (React) and backend (GraphQL API via graphql-yoga) in one project.

## Tech Stack

- **Runtime**: Bun
- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19, Apollo Client 4, TailwindCSS v4
- **Backend**: graphql-yoga (GraphQL API in Next.js API routes)
- **Database**: PostgreSQL via Drizzle ORM
- **Cache**: Redis via ioredis
- **Auth**: JWT (HS512) + AES-CFB encryption, Apple Sign-In
- **Email**: Resend

## Commands

```bash
bun install              # Install dependencies
bun run dev              # Start dev server on port 4399
bun run build            # Production build
bun run start            # Start production server
bun run lint             # Run oxlint
bun run db:studio        # Open Drizzle Studio
```

## Architecture

### Directory Structure
- `src/app/` - Next.js pages (App Router)
- `src/app/api/graphql/` - GraphQL API endpoint (graphql-yoga)
- `src/db/` - Drizzle ORM schema and connection
- `src/server/` - Server-only business logic (auth, crypto, redis, services)
- `src/server/graphql/` - GraphQL resolvers organized by domain
- `src/components/` - React components (feature-based)
- `src/service/` - Apollo Client configuration
- `src/hooks/` - Custom React hooks
- `src/i18n/` - Internationalization

### Data Flow
Frontend (Apollo Client) -> `/api/graphql` (graphql-yoga) -> Resolvers -> Drizzle ORM -> PostgreSQL

### Authentication
JWT tokens with AES-CFB encryption wrapping. Stored in cookies. Roles: Admin(150), Medium(120), Paid(100), Normal(80).

### Database
PostgreSQL with existing tables managed by Drizzle ORM. Schema in `src/db/schema.ts`. No migrations - schema maps to existing tables.

## Conventions

- Single quotes, no semicolons, 2-space indent
- Default exports for React components
- Dark mode first (TailwindCSS)
- Server Components by default, "use client" only for interactive components
