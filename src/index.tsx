// import '@fortawesome/fontawesome-free/css/all.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import setupSentry from './utils/sentry'
import 'intersection-observer'
import './styles/tailwind.css'
import App from './App'

setupSentry()

const rootDOM = document.querySelector('#root')

// registerServiceWorker()

const root = createRoot(rootDOM)
root.render(<App />)
