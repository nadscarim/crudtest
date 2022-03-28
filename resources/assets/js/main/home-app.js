import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import HomeContainer from './home/HomeContainer'
import store from './home-store'
import 'bootstrap/dist/css/bootstrap.min.css'

if (document.getElementById('root')) {
    ReactDOM.render(
        <Provider store={store}>
            <HomeContainer />
        </Provider>,
        document.getElementById('root')
    )
}
