import { createStore, applyMiddleware } from 'redux'
import io from 'socket.io-client'
import reducer from './reducer'
import thunk from 'redux-thunk'
import createSocketIoMiddleware from 'redux-socket.io'
import _ from 'lodash'

let socket = io(window.config.shared.socketData.uri)
let eventName = 'onHomeAction'
let prefix = 'SOCKET_'
let socketIoMiddleware = createSocketIoMiddleware(socket, prefix, {
    eventName,
    execute: (action, emit, next) => {
        if (!action.type) throw new Error('Please Specify action type')
        //remove the prefix in action type and make it kebab case .
        // @example action.type = 'SOCKET_TEST_DATA' -> emit('test-data', action)
        let actionEventName = _.kebabCase(_.replace(action.type, prefix, ''))
        emit(actionEventName, action)

        return next(action)
    }
})

window.socket = socket

let middlewares = [thunk, socketIoMiddleware]

if (process.env.NODE_ENV === 'development') {
    let { logger } = require('redux-logger')

    middlewares.push(logger)
}

const store = createStore(reducer, applyMiddleware(...middlewares))

export default store
