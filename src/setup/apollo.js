import { ApolloClient, createNetworkInterface } from 'react-apollo'

function getPrefix() {
  return process.env.NODE_ENV === 'production' ? 'https://api.dbg.annatarhe.com' : ''
}

const networkInterface = createNetworkInterface({
    uri: `${getPrefix()}/graphql/v1`,
    opts: {
        credentials: 'include',
    }
})

networkInterface.use([{
    applyMiddleware(req, next) {
        const token = sessionStorage.getItem('athena-token') || ""
        req.options.headers = {
            'athena-token': token
        }
        next()
    }
}])

const apolloClient = new ApolloClient({
    reduxRootSelector(store) { return store.get('apollo') },
    networkInterface
})

export { apolloClient }
