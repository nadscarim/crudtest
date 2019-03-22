const { ServiceProvider } = require('@adonisjs/fold')

class AppServiceProvider extends ServiceProvider {
    register () {

        this.app.singleton('MessageService', () => {
            const MessageService = use('App/Services/Home/MessageService')

            return new MessageService()
        })

    }

    boot() {

    }
}

module.exports = AppServiceProvider
