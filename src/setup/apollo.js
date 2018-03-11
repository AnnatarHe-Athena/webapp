import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, from } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
// import {  } from 'apollo-link-context'
import { onError } from 'apollo-link-error'

import { sendNotification } from '../utils/notification'

function getPrefix() {
  return process.env.NODE_ENV === 'production' ? 'https://api.dbg.annatarhe.com' : ''
}

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: { 'athena-token': sessionStorage.getItem('athena-token') || '' } 
  })
  return forward(operation)
})

// error handle
const errorLink = onError(({ graphQLErrors, response }) => {
  graphQLErrors.forEach(err => {
    console.log('error', graphQLErrors, response) // eslint-disable-line no-console
    sendNotification({ title: err.message })
  })
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
