import React, { Component } from 'react'
import TmjPrompt from '../shared/TmjPrompt'
import axios from '../shared/bootstrap/axios.config'
import SampleSocketIO from '../sample/sample-socketio/SampleSocketIOContainer'
import SampleReduxSocketIOContainer from '../sample/sample-redux-socketio/SampleReduxSocketIOContainer'

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
            </div>
        )
    }
}