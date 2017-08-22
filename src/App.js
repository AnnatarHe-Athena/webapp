import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { Router, browserHistory, BrowserRouter } from 'react-router'
import { apolloClient } from './setup/apollo'
import store from './store/index'
import routes from './routes/route'
import './styles/index.styl'

const App = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Router history={browserHistory} routes={routes} />
      </ApolloProvider>
    </Provider>
  )
}

export default App
