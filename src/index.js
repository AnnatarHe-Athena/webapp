import '@fortawesome/fontawesome-free/css/all.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'
import setupSentry from './utils/sentry'
import './styles/tailwind.css'
import './index.css'
import 'intersection-observer'
import './utils/offline'

setupSentry()

const rootDOM = document.querySelector('#root')

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootDOM
)
// registerServiceWorker()

