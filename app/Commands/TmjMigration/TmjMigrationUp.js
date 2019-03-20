'use strict'

const  BaseMigration = require('@adonisjs/lucid/commands/BaseMigration')
const requireAll = require('require-all')
const prettyHrTime = require('pretty-hrtime')
const path = require('path')
class TmjMigrationUp extends BaseMigration {

    static get signature () {
        return `tmj:migration-run {
          --folder=@value : Folder of the migration,
        }`
    }

    static get description () {
        return 'Run migration on specified folder'
    }

    async handle (args, options) {
        const startTime = process.hrtime()
        this.filepath = path.resolve(this._migrationsPath, options.folder)
        const { migrated, status } = await this.migration.up(this._getSchemaFiles())

        if (status === 'completed') {
            const endTime = process.hrtime(startTime)
            migrated.forEach((name) =>this.completed('migrate', `${name}.js`))
            this.success(`Database migrated successfully in ${prettyHrTime(endTime)}`)
        }
    }

    _getSchemaFiles () {
        return requireAll({
            dirname: this.filepath,
            filters: /(.*)\.js$/
        })
    }
}

module.exports = TmjMigrationUp
