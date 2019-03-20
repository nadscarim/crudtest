'use strict'

const { Command } = require('@adonisjs/ace')
const ace = require('@adonisjs/ace')
const Helpers = use('Helpers');

class SeedMongo extends Command {
    static get signature () {
        return `
        seed:mongo
        {file?: Run only selected files }
        `
    }

    static get description () {
        return 'Run seeders for Mongo'
    }

    async handle (args, options) {
        // this.info('Dummy implementation for seed:mongo command')
        let path = Helpers.seedsPath() + '/Mongo';

        ace.command();
    }
}

module.exports = SeedMongo
