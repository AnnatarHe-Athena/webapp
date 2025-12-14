# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Athena webapp is a pnpm monorepo containing a React-based web client for douban-girls, built with Apollo Client for GraphQL, React Router, and Redux.

## Monorepo Structure

- **packages/webapp** - Main web application (React, Vite, TailwindCSS)
- **packages/desktop** - Electron desktop app with main/preload/renderer packages
- **packages/components** - Shared React components
- **packages/network** - Apollo Client setup and GraphQL code generation
- **packages/utils** - Shared utilities, Redux actions/reducers, hooks, and constants

## Development Commands

```bash
# Install dependencies (from root)
pnpm install

# Start webapp dev server (runs on port 4399)
pnpm --filter @athena/webapp dev

# Build webapp for production
pnpm --filter @athena/webapp prod

# Run webapp tests
pnpm --filter @athena/webapp test

# Generate GraphQL types (in network package)
pnpm --filter @athena/network codegen

# Desktop app commands (from packages/desktop)
pnpm --filter athena_desktop watch    # Dev mode
pnpm --filter athena_desktop build    # Build all (main/preload/renderer)
pnpm --filter athena_desktop compile  # Build + create distributable
pnpm --filter athena_desktop test     # Run all tests
pnpm --filter athena_desktop lint     # Lint with Biome
pnpm --filter athena_desktop typecheck  # Type check all packages
```

## Architecture Notes

### GraphQL Setup
- Schema lives in `packages/network/schema/`
- Generated types output to `packages/network/_g/`
- Uses `@graphql-codegen/client-preset` for type generation
- Apollo Client configured in `packages/network/apollo.ts`

### State Management
- Redux with redux-saga for side effects (webapp)
- Jotai for atomic state (webapp)
- TanStack Query for desktop app

### Package Dependencies
- `@athena/components` depends on `@athena/utils` and `@athena/network`
- `@athena/webapp` depends on all other packages
- `@athena/utils` contains shared Redux reducers/actions

### Build Tools
- Vite with SWC plugin for React compilation
- TailwindCSS for styling (config in webapp package)
- TypeScript with strict mode enabled

## Commit Message Format

Follow Conventional Commits with scope:

```
fix(home): add price link on home page
feat(ai): add AI module
refactor(cell): update cell module for better maintenance
perf(parser): improve parser performance by over 30%
```
