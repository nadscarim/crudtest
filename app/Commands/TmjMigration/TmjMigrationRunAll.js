'use strict'

const  BaseMigration = require('@adonisjs/lucid/commands/BaseMigration')
const requireAll = require('require-all')
const prettyHrTime = require('pretty-hrtime')

class TmjMigrationRunAll extends BaseMigration {
    static get signature () {
        return 'tmj:migration-run-all'
    }

    static get description () {
        return 'Run all migrations inside the migrations folder'
    }

    async handle (args, options) {
        const startTime = process.hrtime()
        let files = this._getSchemaFiles();
        let objToMigrate = {}
        Object.entries(files).forEach(([key, value]) => {
            if (typeof value == 'object') {
                Object.entries(value).forEach(([innerKey, innerValue]) => {
                    objToMigrate[innerKey] = innerValue;
                })
            }
        });

        const { migrated, status } = await this.migration.up(objToMigrate)
        if (status === 'completed') {
            const endTime = process.hrtime(startTime)
            migrated.forEach((name) =>this.completed('migrate', `${name}.js`))
            this.success(`Database migrated successfully in ${prettyHrTime(endTime)}`)
        }
    }
}

module.exports = TmjMigrationRunAll
