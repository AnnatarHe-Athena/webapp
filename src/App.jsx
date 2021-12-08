import React from 'react'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './setup/apollo'
import Root from './components/Root'
import store from './store/index'
import routes from './routes/route'
import './styles/index.styl'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-tippy/dist/tippy.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <BrowserRouter>
          <Root>
            <Routes>
              {routes.map(r => (
                <Route path={r.path} key={r.path} element={React.createElement(r.component)} />
              ))}
            </Routes>
          </Root>
        </BrowserRouter>
      </Provider>
      <ToastContainer />
    </ApolloProvider>
  )
}

export default App
