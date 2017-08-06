import { ApolloClient, createNetworkInterface } from 'react-apollo'

function getPrefix() {
  return process.env.NODE_ENV === 'production' ? 'https://api.dbg.annatarhe.com' : ''
}
const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: `${getPrefix()}/graphql/v1`
  })
})

export { apolloClient }
