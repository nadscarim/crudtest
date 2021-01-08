const { ServiceProvider } = require('@adonisjs/fold')

class SocketProvider extends ServiceProvider {
    register() {
        this.app.singleton('Jobs', () => new (use('App/Services/JobService'))())
    }

    boot() {
        // use('Socket').start();
    }
}

module.exports = SocketProvider
