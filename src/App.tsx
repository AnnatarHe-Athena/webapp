import * as React from 'react'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'
import store from './store/index'
import routes from './routes/route'
import './App.css';


class App extends React.Component<{}, null> {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    {renderRoutes(routes)}
                </BrowserRouter>
            </Provider>
        )
    }
}

export default App;
