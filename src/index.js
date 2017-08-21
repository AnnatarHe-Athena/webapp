import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const rootDOM = document.querySelector('#root')

ReactDOM.render(
    <AppContainer>
        <App />
    </AppContainer>,
    rootDOM
)
registerServiceWorker()

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default
        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            rootDOM
        )
    })
}
