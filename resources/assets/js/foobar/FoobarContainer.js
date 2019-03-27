import React, { Component } from 'react'
import TmjPrompt from '../shared/TmjPrompt'
import axios from '../shared/bootstrap/axios.config'
import SampleSocketIO from '../sample/sample-socketio/SampleSocketIOContainer'
import SampleReduxSocketIOContainer from '../sample/sample-redux-socketio/SampleReduxSocketIOContainer'
import SampleReactLoadableRouterContainer from '../sample/sample-react-loadable-router/SampleReactLoadableRouterContainer'

export default class FoobarContainer extends Component {
    handleClick() {
        TmjPrompt.success('foobar')
        console.log('foobar')
        axios.get('/')
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Click me!</button>
                {/* <SampleSocketIO /> */}
                <SampleReduxSocketIOContainer />
                <SampleReactLoadableRouterContainer />
            </div>
        )
    }
}