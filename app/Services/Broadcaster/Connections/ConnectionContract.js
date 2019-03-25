'use strict'

/**
 * A Server to Client Broadcasting Service.
 * @author Offshore Lab
 * @copyright TMJ Engineers @ 2018
 */

class ConnectionContract {

    fire() {
        throw new Exception('please declare the fire function')
    }

    listen() {
        throw new Exception('please declare the listen function')
    }

    removeListener() {
        throw new Exception('please declare the removeListener function')
    }

    getSocketInstance() {
        throw new Exception('please declare the getSocketInstance function')
    }
}

module.exports = ConnectionContract
