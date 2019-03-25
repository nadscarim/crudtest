'use strict'

/**
 * A Server to Client Broadcasting Service.
 * @author Offshore Lab
 * @copyright TMJ Engineers @ 2018
 */

class Socket {
    constructor(socket) {
        this.socket = socket
    }

    getId() {
        return this.socket.id
    }

    on(eventName, callback) {
        this.socket.on(eventName, (data) => {
            callback(data, this)
        })
    }

    off(eventName, callback) {
        // in socket io removelistener need the same callback used in listening
        this.socket.removeListener(eventName, (data) => {
            callback(data, this)
        })
    }

    joinRoom(channel) {
        this.socket.join(channel)
    }

    leaveRoom(channel) {
        this.socket.leave(channel)
    }
}

module.exports = Socket
