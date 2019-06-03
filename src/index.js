import '@fortawesome/fontawesome-free/css/all.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'
import './index.css'
import 'intersection-observer'
import './utils/offline'
import setupSentry from './utils/sentry'


setupSentry()


const rootDOM = document.querySelector('#root')

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootDOM
)
// registerServiceWorker()

