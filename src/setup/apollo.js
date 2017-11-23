import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, from } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import {  } from 'apollo-link-context'
import { onError } from 'apollo-link-error'

function getPrefix() {
  return process.env.NODE_ENV === 'production' ? 'https://api.dbg.annatarhe.com' : ''
}

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: { 'athena-token': sessionStorage.getItem('athena-token') || '' } 
  })
  return forward(operation)
})

const errorLink = onError(({ networkError, graphQLErrors, response }) => {
  // error handle
  if (networkError.statusCode === 401) {
    console.log('error', graphQLErrors, response) // eslint-disable-line no-console
  }
})

const link = new HttpLink({
  uri: `${getPrefix()}/graphql/v1`,
  credentials: 'include'
})

const apolloClient = new ApolloClient({
  link: from([authMiddleware, errorLink, link]),
  cache: new InMemoryCache()
})

export { apolloClient }
