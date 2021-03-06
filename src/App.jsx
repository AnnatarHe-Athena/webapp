import React from 'react'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'
// import { hot } from 'react-hot-loader/root'
import { Router, Location } from '@reach/router'
import { apolloClient } from './setup/apollo'
import Root from './components/Root'
import store from './store/index'
import routes from './routes/route'
import './styles/index.styl'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-tippy/dist/tippy.css'

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <Location>
            {({ location }) => (
              <Root location={location}>
                <Router location={location}>
                  {routes.map(r => (<r.component key={r.path} path={r.path} />))}
                </Router>
              </Root>
            )}
          </Location>
        </Provider>
      <ToastContainer />
    </ApolloProvider>
  )
}

export default App
