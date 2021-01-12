/**
 * Example based on:
 * https://alligator.io/react/react-loadable/#route-based-code-splitting
 */
import React, { Component } from 'react'
import Loadable from 'react-loadable'
import {
    Link, Route, HashRouter, Switch
} from 'react-router-dom'

// static import
import Dashboard from './components/Dashboard'

const Loading = ({ error }) => {
    if (error) {
        return 'Oh nooess!'
    }
    return <h3>Loading...</h3>
}

// dynamic import using react loadable
const Settings = Loadable({
    loader: () => import('./components/Settings'),
    loading: Loading
})

const AddUser = Loadable({
    loader: () => import('./components/AddUser'),
    loading: Loading
})

class SampleReactLoadableRouterContainer extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <nav>
                        <Link to="/">Dashboard</Link>
                        {' '}
                        <Link to="/settings">Settings</Link>
                        {' '}
                        <Link to="/add-user">Add User</Link>
                    </nav>
                    <hr />
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route path="/settings" component={Settings} />
                        <Route path="/add-user" component={AddUser} />
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}

export default SampleReactLoadableRouterContainer
