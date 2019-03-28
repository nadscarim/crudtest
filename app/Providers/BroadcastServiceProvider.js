const { ServiceProvider } = require('@adonisjs/fold')

class BroadcastServiceProvider extends ServiceProvider {
    register () {
        const Config = use('Config')
        let broadcastConfig = Config.get('broadcaster')

        this.app.singleton('Broadcaster', () => {
            const BroadcastManager = use('App/Services/Broadcaster/BroadcastManager')

            const Server = use('Server')

            return new BroadcastManager(
                broadcastConfig,
                Server.getInstance()
            )
        })

        this.app.singleton('BroadcastEvent', () => {
            const BroadcastEvent = use('App/Services/Broadcaster/BroadcastEvent')
            const BroadcastManager = use('Broadcaster')

            return new BroadcastEvent(
                BroadcastManager,
                broadcastConfig
            )
        })
    }

    boot() {
        const BroadcastEvent = use('BroadcastEvent')
        const appRoot = use('Helpers').appRoot()

        BroadcastEvent.bootListeners(appRoot + '/')

        // add hook to be called in socket.
        BroadcastEvent.addHook((socket) => {
            socket.joinRoom('sample')
        })

    }
}

module.exports = BroadcastServiceProvider
