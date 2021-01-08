import React, { Component } from 'react'
import TmjPrompt from 'Shared/TmjPrompt'
import { axios } from 'Shared/bootstrap'

import Loadable from 'react-loadable'
import {
    Link, Route, HashRouter, Switch
} from 'react-router-dom'

const Loading = ({ error }) => {
    if (error) {
        return 'Oh nooess!'
    }

    return <h3>Loading...</h3>
}

const Test = () => {
    const handleClick = () => {
        TmjPrompt.success('foobar')
        console.log('foobar')
        logger.log('ksjdfkdkfj')
        axios.get('/')
    }

    return <button onClick={handleClick}>Click me!</button>
}

// dynamic import using react loadable

// const SampleSocketIO = Loadable({
//     loader: () => import('../sample/sample-socketio/SampleSocketIOContainer'),
//     loading: Loading
// })
const SampleReduxSocketIOContainer = Loadable({
    loader: () => import('../sample/sample-redux-socketio/SampleReduxSocketIOContainer'),
    loading: Loading
})
// const SampleReactLoadableRouterContainer = Loadable({
//     loader: () => import('../sample/sample-react-loadable-router/SampleReactLoadableRouterContainer'),
//     loading: Loading
// })

export default class FoobarContainer extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <nav>
                        <li>
                            <Link to="/">Test</Link>
                            {' '}
                        </li>
                        {/* <li><Link to="/sample-socket-io">SampleSocketIO</Link>{' '}</li> */}
                        <li>
                            <Link to="/sample-redux-socket-io">SampleReduxSocketIOContainer</Link>
                            {' '}
                        </li>
                        {/* <li><Link to="/sample-react-loadable-router">SampleReactLoadableRouterContainer</Link>{' '}</li> */}
                    </nav>
                    <hr />
                    <Switch>
                        <Route exact path="/" component={Test} />
                        {/* <Route path="/sample-socket-io" component={SampleSocketIO} /> */}
                        <Route path="/sample-redux-socket-io" component={SampleReduxSocketIOContainer} />
                        {/* <Route path="/sample-react-loadable-router" component={SampleReactLoadableRouterContainer} /> */}
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}
