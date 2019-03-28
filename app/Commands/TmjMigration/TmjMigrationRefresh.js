'use strict'

const  BaseMigration = require('@adonisjs/lucid/commands/BaseMigration')
const ace = require('@adonisjs/ace')
class TmjMigrationRefresh extends BaseMigration {
    static get signature () {
        return 'tmj:migration-refresh'
    }

    static get description () {
        return 'Refresh database'
    }

    async handle (args, options) {

        await ace.call('tmj:migration-rollback-all', {}, {})
        await ace.call('tmj:migration-run-all', {}, {})

    }
}

module.exports = TmjMigrationRefresh
