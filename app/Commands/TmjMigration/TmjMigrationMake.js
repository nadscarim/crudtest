'use strict'

const path = require('path')
const { Command } = require('@adonisjs/ace')
const _ = require('lodash');
const moment = use('moment');

class TmjMigrationMake extends Command {
    constructor (Helpers) {
        super()
        this.Helpers = Helpers
    }

    static get signature () {
        return `tmj:migration-make 
        { name : Name of file}
        {--folder=@value : Directory and name of migration}
        {--create?=@value : Table to be created}
        {--alter?=@value : Table to be altered}
        `
    }

    static get inject () {
        return ['Adonis/Src/Helpers']
    }

    static get description () {
        return 'Tmj standard for creating migration'
    }

    async handle ({name}, {folder, create, alter}) {
        let dateTime = new Date();
        if (create && alter) {
            throw new Error('You can only do create and alter one at a time, do not be hard-headed!');
        }
        let tableName = create
        let template = await this.readFile(path.join(__dirname, './mustache/create-migration-stub.mustache'), 'utf8')

        if (alter) {
            tableName = alter
            template = await this.readFile(path.join(__dirname, './mustache/alter-migration-stub.mustache'), 'utf8')
        }

        let className = (_.startCase(name)).replace(/\s/g, '');
        let filename = moment(dateTime).format("YYYYMMDDHHmmss") + '_' + name + '.js';
        
        const relativePath = path.join(`database/migrations/${folder}`, `${filename}`)

        const validatorPath = path.join(this.Helpers.appRoot(), relativePath)

        this.info(`${filename} was successfully created`);

        return this.generateFile(validatorPath, template, { className, tableName })
    }

}

module.exports = TmjMigrationMake
