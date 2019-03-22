const { ServiceProvider } = require('@adonisjs/fold')


class SocketProvider extends ServiceProvider {
    register () {
        this.app.singleton('Jobs', () => {
            return new (use('App/Services/JobService'))()
        })
    }
    boot() {
        // use('Socket').start();
    }
}

module.exports = SocketProvider