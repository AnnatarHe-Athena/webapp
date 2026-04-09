import { createYoga } from 'graphql-yoga'
import { schema } from '@/server/graphql/schema'
import { createContext } from '@/server/graphql/context'

const yoga = createYoga({
  schema,
  context: createContext,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
})

export const GET = yoga
export const POST = yoga
