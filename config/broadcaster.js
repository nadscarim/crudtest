'use strict'

/**
 * Server to client Broadcaster.
 * @author Offshore Lab
 * @copyright TMJ Engineers 2018
 */

const ENV = use('Env')

module.exports = {
    log: true,
    // secret key to be use for security
    secretKey: ENV.get('BROADCAST_SECRET_KEY'),
    // Default connection
    default: ENV.get('BROADCAST_CONNECTION', 'socketio'),
    /**
     * Listener Path/Files
     */
    listeners: [
        'app/Listeners'
    ],
    /**
     * List of connections that can be used
     */
    connections: {
        socketio: {
            driver: 'socketio',
            client: {
                prefix: 'SOCKET_',
                uri: ENV.get('SOCKET_URL')
            },
            /**
             * {optional} Specify the port to be use,
             * If you have bootstrap a server instance
             * this is not requierd
             */
            port: ENV.get('SOCKET_PORT', '9000'),
            options: {},
            middlewares: [],
        }
    }
}
