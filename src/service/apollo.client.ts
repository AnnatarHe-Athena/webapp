'use client'

import { ApolloClient, from } from '@apollo/client'
import { httpLink, authLink, errorLink, apolloCacheConfig } from './apollo.shared'

export function makeClient() {
  return new ApolloClient({
    link: from([authLink, errorLink, httpLink]),
    cache: apolloCacheConfig,
  })
}
