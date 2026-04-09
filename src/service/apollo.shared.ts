import { ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import toast from 'react-hot-toast'

const httpLink = new HttpLink({
  uri: '/api/graphql',
  credentials: 'same-origin',
})

const authLink = new ApolloLink((operation, forward) => {
  // Read token from cookie or localStorage
  const token = typeof window !== 'undefined'
    ? document.cookie.split('; ').find(c => c.startsWith('athena:token='))?.split('=')[1] || ''
    : ''

  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'X-Platform': 'web',
    },
  })
  return forward(operation)
})

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((err) => {
      console.error('[GraphQL Error]', err.message)
      if (typeof window !== 'undefined') {
        toast.error(err.message)
      }
    })
  }
})

export const apolloCacheConfig = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        girls: {
          keyArgs: ['from', 'hideOnly', 'venusId'],
          merge(existing = [], incoming: any[]) {
            return [...existing, ...incoming]
          },
        },
      },
    },
  },
})

export { httpLink, authLink, errorLink }
