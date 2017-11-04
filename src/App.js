import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Router, browserHistory } from 'react-router'
import { apolloClient } from './setup/apollo'
import store from './store/index'
import routes from './routes/route'
import { syncHistoryWithStore } from 'react-router-redux'
import './styles/index.styl'

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(store) {
    return store.get('routing')
  }
})

const App = () => {
  return (
    <ApolloProvider store={store} client={apolloClient}>
      <Router history={history} routes={routes} />
    </ApolloProvider>
  )
}

export default App
