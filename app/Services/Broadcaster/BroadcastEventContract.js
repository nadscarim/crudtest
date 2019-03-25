'use strict'

/**
 * A base class for broadcasting event.
 * @author Offshore Lab
 * @copyright TMJ Engineers @ 2018
 */

class BroadcastEventContract {

    /**
     * Connection name to be use
     * @return {string}
     */
    connection() {
        return undefined
    }

    /**
     * Data to be send when the event was emitted.
     * @return object
     */
    data() {
        throw new Exception('please declare the data function')
    }

    /**
     * Event Channel to be broadcasted.
     * @return array
     */
    broadcastOn() {
        return
        // throw new Exception('please declare the broadcastOn function');
    }

    /**
     * Event Name to be broadcast
     * @return string
     */
    broadcastAs() {
        throw new Exception('please declare the broadcastAs function')
    }
}

module.exports = BroadcastEventContract
