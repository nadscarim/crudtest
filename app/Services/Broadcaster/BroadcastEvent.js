'use strict'
/**
 * A Server to Client Broadcasting Service.
 * @author Offshore Lab
 * @copyright TMJ Engineers @ 2018
 */

const BroadcastEventContract = require('./BroadcastEventContract')
const BroadcastListenContract = require('./BroadcastListenContract')

class BroadcastEvent {
    constructor(manager, config) {
        this.manager = manager
        this.config = config
    }

    fire(eventClass) {
        if (!(eventClass instanceof BroadcastEventContract))
            throw new Error('Event should be an instance of BroadcastEventContract')

        // get the connection where to fire the event.
        let connection = this.manager.connection(eventClass.connection())

        connection.fire(
            eventClass.broadcastOn(),
            eventClass.broadcastAs(),
            eventClass.data(),
        )
    }

    listen(listenClass) {
        if (!(listenClass instanceof BroadcastListenContract))
            throw new Error('Event should be an instance of BroadcastListenContract')

        // get the connection where to fire the event.
        let connection = this.manager.connection(listenClass.connection())

        connection.listen(
            listenClass.eventName(),
            listenClass.handle.bind(listenClass)
        )
    }

    removeListener(listenClass) {
        if (!(listenClass instanceof BroadcastListenContract))
            throw new Error('Event should be an instance of BroadcastListenContract')

        // get the connection where to fire the event.
        let connection = this.manager.connection(listenClass.connection())

        connection.fire(
            listenClass.eventName(),
            listenClass.handle
        )
    }

    bootListeners(rootPath) {
        const requireAll = require('require-all')
        const options = {
            recursive: true
        }
        this.config.listeners.map((listenerPath)=>{
            let listeners = requireAll({
                dirname: rootPath + listenerPath,
                ...options
            })

            Object.values(listeners).map((Listener) => {
                this.listen(new Listener())
            })
        })
    }

    addHook(callback, connectionName) {
        // get the connection where to fire the event.
        let connection = this.manager.connection(connectionName)

        connection.addHook(callback)
    }
}

module.exports = BroadcastEvent
