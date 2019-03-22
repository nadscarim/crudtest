const { ServiceProvider } = require('@adonisjs/fold')


class SocketProvider extends ServiceProvider {
    // remove -- old socket provider
    // currently using BroadcastServiceProvider
    // register () {
    //     this.app.singleton('Socket', () => {
    //         return new (use('App/Services/SocketService'))()
    //     })
    // }
    // boot() {
    //     use('Socket').run();
    // }
}

module.exports = SocketProvider