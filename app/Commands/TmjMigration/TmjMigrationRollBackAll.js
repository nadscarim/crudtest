'use strict'

const  BaseMigration = require('@adonisjs/lucid/commands/BaseMigration')
const prettyHrTime = require('pretty-hrtime')

class TmjMigrationRollBackAll extends BaseMigration {
    static get signature () {
        return 'tmj:migration-rollback-all'
    }

    static get description () {
        return 'Roll back all migrations inside the migrations folder'
    }

    async handle (args, options) {
        const startTime = process.hrtime()
        let files = this._getSchemaFiles();
        let objToRollback = {}

        Object.entries(files).forEach(([key, value]) => {
            if (typeof value == 'object') {
                Object.entries(value).forEach(([innerKey, innerValue]) => {
                    objToRollback[innerKey] = innerValue;
                })
            }
        });

        const { migrated, status } = await this.migration.down(objToRollback)

        if (status === 'completed') {
            const endTime = process.hrtime(startTime)
            migrated.forEach((name) =>this.completed('migrate', `${name}.js`))

            if (!this.viaAce) {
                this.success(`Database rollback successfully in ${prettyHrTime(endTime)}, please wait another moment, migration is still ongoing`)
            } else {
                this.success(`Database rollback successfully in ${prettyHrTime(endTime)}`)
            }

        }
    }
}

module.exports = TmjMigrationRollBackAll
