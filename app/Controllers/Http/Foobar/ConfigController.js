'use strict'

const Config = use('Config')

class ConfigController {
    async index({ response }) {
        /**
         * NOTE: Expose config is a security risk be sure to only expose data
         * that is not confidential e.g.(password, encryption key etc)
         * DO NOT EXPOSE EVERYTHING. select the things you only require in the client
         */
        let configData = {
            shared: {
                general: this._getGeneralConfig(),
                socketData: Config.get('broadcaster.connections.socketio.client')
            },
            foobar: this._getFoobarConfig()
        }

        let config = 'config = ' + JSON.stringify(configData) + ';'
        response.header('Content-type', 'text/javascript')
        response.send(config)
    }

    _getGeneralConfig() {
        return {
            company: Config.get('shared.general.company')
        }
    }

    _getFoobarConfig() {
        let foobar = Config.get('foobar')

        return {
            foobar: foobar.foobar
        }
    }
}

module.exports = ConfigController
