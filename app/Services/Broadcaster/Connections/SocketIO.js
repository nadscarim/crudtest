'use strict'

/**
 * A Server to Client Broadcasting Service.
 * @author Offshore Lab
 * @copyright TMJ Engineers @ 2018
 */

const ConnectionContract = require('./ConnectionContract')
// import ConnectionContract from './ConnectionContract';
const SocketServer = require('socket.io')
const Socket = require('./Socket')
// driver
class SocketIO extends ConnectionContract {
    constructor(serverInstance, config) { //, logger) {
        super(serverInstance, config)

        this.listeners = []
        this.hooks = []
        // this.logger = logger;
        this.socket

        serverInstance = serverInstance || config.port

        // server options
        this.serverOptions = {...config.options, pingTimeout: 60000 }

        this.io = new SocketServer(serverInstance, this.serverOptions)
        // this.io.use(() => {

        // });

        this.io.on('connection', (socket)=> {
            this.socket = new Socket(socket)
            console.log('someone connected to socket', this.socket.getId())
            // this.logger('someone connected to socket', this.socket.getId());
            this.listeners.map(({eventName, callback}) => this.listen(eventName, callback))

            this.hooks.map((hook) => this.addHook(hook))
        })
    }


    /**
     * {channel} - array of channels
     * {eventName} - name of event to be emitted.
     * {data} - data object to be emitted.
     */
    fire(channel, eventName, data) {
        if (!channel) return this.io.emit(eventName, data)

        this.io.to(channel).emit(eventName, data)
    }

    listen(eventName, callback) {
        // temporary solution to wait first if there is no socket
        if (!this.socket)
            return this.listeners.push({eventName, callback})

        this.socket.on(eventName, callback)
    }

    removeListener(eventName, callback) {
        if (!this.socket) return
        this.socket.off(eventName, callback)
    }

    getInstance() {
        return this.io
    }

    getSocketInstance() {
        return this.socket
    }

    addHook(callback) {
        if (!this.socket) return this.hooks.push(callback)

        console.log('added hooks')

        callback(this.socket)
    }

}

module.exports = SocketIO
