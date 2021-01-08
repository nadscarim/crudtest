'use strict'

class TranslationController {
    async index({ antl, response }) {
        // to do: locale switching

        let translationData = {
            foobar: this._getFoobarTranslation(antl),
            shared: this._getSharedTranslation(antl)
        }

        let translations = 'translations = ' + JSON.stringify(translationData) + ';'
        response.header('Content-type', 'text/javascript')
        response.send(translations)
    }

    _getFoobarTranslation(Antl) {
        return {
            foobar: Antl.get('foobar.foobar')
        }
    }

    _getSharedTranslation(Antl) {
        return {
            copyright: Antl.get('shared.copyright'),
            prompt: Antl.get('shared.prompt'),
            datatable: Antl.get('shared.datatable'),
            validation: Antl.get('shared.validation')
        }
    }
}

module.exports = TranslationController
