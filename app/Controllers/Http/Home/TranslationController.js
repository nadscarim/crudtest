'use strict'

class TranslationController {
    async index({ antl, response }) {
        // to do: locale switching

        let translationData = {
            home: this._getHomeTranslation(antl),
            shared: this._getSharedTranslation(antl)
        }

        let translations = 'translations = ' + JSON.stringify(translationData) + ';'
        response.header('Content-type', 'text/javascript')
        response.send(translations)
    }

    _getHomeTranslation(Antl) {
        return {
            // button: Antl.get('login.button'),
            // label: Antl.get('login.label'),
            // error: Antl.get('login.error')
        }
    }

    _getSharedTranslation(Antl) {
        return {
            company: Antl.get('shared.company'),
            copyright: Antl.get('shared.copyright'),
            prompt: Antl.get('shared.prompt'),
            datatable: Antl.get('shared.datatable'),
            button: Antl.get('shared.button')
            // errors: Antl.get('shared.errors'),
            // label: Antl.get('shared.label')
        }
    }
}

module.exports = TranslationController
