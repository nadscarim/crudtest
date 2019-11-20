import React, { Component } from 'react'
import TmjPrompt from 'Shared/TmjPrompt'
import { axios } from 'Shared/bootstrap'

import Loadable from 'react-loadable'
import { Link, Route, HashRouter, Switch } from 'react-router-dom'

const Loading = ({ error }) => {
    if (error) {
        return 'Oh nooess!'
    } else {
        return <h3>Loading...</h3>
    }
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
const SampleFormDialog = Loadable({
    loader: () => import('../sample/material-ui/modals/SampleFormDialog'),
    loading: Loading
})
const SampleTextFields = Loadable({
    loader: () => import('../sample/material-ui/forms/SampleTextFields'),
    loading: Loading
})
const SampleFormValidation = Loadable({
    loader: () => import('../sample/material-ui/forms/SampleFormValidation'),
    loading: Loading
})
const SampleSimpleTable = Loadable({
    loader: () => import('../sample/material-ui/tables/SampleSimpleTable'),
    loading: Loading
})
const SampleEnhancedTable = Loadable({
    loader: () => import('../sample/material-ui/tables/SampleEnhancedTable'),
    loading: Loading
})

export default class FoobarContainer extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <nav>
                        <li><Link to="/">Test</Link>{' '}</li>
                        {/* <li><Link to="/sample-socket-io">SampleSocketIO</Link>{' '}</li> */}
                        <li><Link to="/sample-redux-socket-io">SampleReduxSocketIOContainer</Link>{' '}</li>
                        {/* <li><Link to="/sample-react-loadable-router">SampleReactLoadableRouterContainer</Link>{' '}</li> */}
                        <li><Link to="/sample-form-dialog">SampleFormDialog</Link>{' '}</li>
                        <li><Link to="/sample-text-fields">SampleTextFields</Link>{' '}</li>
                        <li><Link to="/sample-form-validation">SampleFormValidation</Link>{' '}</li>
                        <li><Link to="/sample-simple-table">SampleSimpleTable</Link>{' '}</li>
                        <li><Link to="/sample-enhanced-table">SampleEnhancedTable</Link>{' '}</li>
                    </nav>
                    <hr />
                    <Switch>
                        <Route exact path="/" component={Test} />
                        {/* <Route path="/sample-socket-io" component={SampleSocketIO} /> */}
                        <Route path="/sample-redux-socket-io" component={SampleReduxSocketIOContainer} />
                        {/* <Route path="/sample-react-loadable-router" component={SampleReactLoadableRouterContainer} /> */}
                        <Route path="/sample-form-dialog" component={SampleFormDialog} />
                        <Route path="/sample-text-fields" component={SampleTextFields} />
                        <Route path="/sample-form-validation" component={SampleFormValidation} />
                        <Route path="/sample-simple-table" component={SampleSimpleTable} />
                        <Route path="/sample-enhanced-table" component={SampleEnhancedTable} />
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}

// export default class FoobarContainer extends Component {

//     render() {
//         logger.log('from logger')
//         return (
//             <div>
//                 <Test />
//                 <SampleSocketIO />
//                 <SampleReduxSocketIOContainer />
//                 <SampleReactLoadableRouterContainer />
//                 <SampleFormDialog />
//                 <SampleTextFields />
//                 <SampleFormValidation />
//                 <SampleSimpleTable />
//                 <SampleEnhancedTable />
//             </div>
//         )
//     }
// }