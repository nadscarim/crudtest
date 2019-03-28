'use strict'

/**
 * A base class for listening broadcast of events.
 * @author Offshore Lab
 * @copyright TMJ Engineers @ 2018
 */

class BroadcastListen {

    /**
     * Connection name to be use
     * @return {string}
     */
    connection() {
        return undefined
    }

    /**
     * Callback of event that handle logic after receiving the event
     * @param {object} data - object sent by the emitted event
     * @param {object} instance - object socket instance
     */
    handle(data, instance) {
        throw new Exception('please declare the channel function')
    }

    /**
     * Event Name to listen
     * @return {string}
     */
    eventName() {
        throw new Exception('please declare the eventName function')
    }
}

module.exports = BroadcastListen
