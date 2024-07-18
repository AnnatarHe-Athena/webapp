// import '@fortawesome/fontawesome-free/css/all.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import setupSentry from '@athena/utils/utils/sentry'
import App from './App'
import 'intersection-observer'
import './styles/tailwind.css'
setupSentry()

const rootDOM = document.querySelector('#root')
const root = createRoot(rootDOM!)
root.render(<App />)
// registerServiceWorker()
