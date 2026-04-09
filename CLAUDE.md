# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

Athena webapp is a Next.js 16 application for browsing and curating beauty images. Built with Apollo Client for GraphQL, TailwindCSS for styling, and i18next for internationalization.

## Development Commands

```bash
pnpm install              # Install dependencies
pnpm dev                  # Start dev server (port 4399)
pnpm build                # Production build
pnpm g                    # Generate GraphQL types
pnpm lint                 # Run oxlint
pnpm format               # Format with oxfmt
pnpm test                 # Run tests
```

## Architecture

- **Framework**: Next.js 16 App Router with React 19
- **Data Fetching**: Apollo Client 4 with GraphQL
- **Styling**: TailwindCSS v4 (dark-first)
- **i18n**: i18next with en, zh, ja, ko locales
- **Forms**: React Hook Form + Zod
- **Testing**: Vitest + React Testing Library

### Directory Structure
- `src/app/` - Next.js pages (App Router)
- `src/components/` - Feature-based React components
- `src/service/` - Apollo Client setup, auth, tokens
- `src/schema/` - GraphQL operation files (.gql)
- `src/gql/` - Generated GraphQL types
- `src/hooks/` - Custom React hooks
- `src/i18n/` - Internationalization setup
- `src/utils/` - Utility functions

## Conventions
- Single quotes, no semicolons, 2-space indent
- Default exports for React components
- Server Components by default, 'use client' for interactive
- Dark mode first
