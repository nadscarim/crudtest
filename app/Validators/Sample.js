/**
 * You may check out the following documentation:
 * - https://github.com/adonisjs/adonis-validation-provider/blob/develop/instructions.md
 * - https://adonisjs.com/docs/4.0/validator
 * - https://indicative.adonisjs.com
 */

'use strict'

const Antl = use('Antl')
class Sample {
    get rules() {
        return {
            name: 'required',
            email: 'required'
        }
    }

    get messages() {
        return {
            'name.required': Antl.formatMessage('sample-validator.user.required.name'),
            'email.required': Antl.formatMessage('sample-validator.user.required.name')
        }
    }

    get validateAll() {
        return true
    }

    async authorize() {
        // Use the model that has the policy needed
        // return user.can('view', '<model>')
    }
}

module.exports = Sample
