import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'
import { apolloClient } from './setup/apollo'
import store from './store/index'
import routes from './routes/route'

const App = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          {renderRoutes(routes)}
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  )
}

export default App
