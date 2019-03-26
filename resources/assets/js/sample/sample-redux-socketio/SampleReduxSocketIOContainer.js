import store from './store'
import { Provider } from 'react-redux'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMessages, createMessage } from './actions'

class SampleReduxSocketIOContainer extends Component {
    initialState = {
        message: {
            content: ''
        }
    }

    state = this.initialState

    handleSubmit = event => {
        event.preventDefault()
        console.log(this.props)
        console.log(
            this.props.createMessage(this.state.message)
        )
    }

    handleChange = event => {
        this.setState({
            message: {
                content: event.target.value
            }
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="content"
                        value={this.state.message.content}
                        onChange={this.handleChange}
                    />
                    <button>Send</button>
                </form>
                <ul>
                    {this.props.messages.map((message, index) => {
                        return <li key={index}>{message.content}</li>
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = {
    fetchMessages,
    createMessage
}

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(SampleReduxSocketIOContainer)

export default () => (
    <Provider store={store}>
        <App />
    </Provider>
)
