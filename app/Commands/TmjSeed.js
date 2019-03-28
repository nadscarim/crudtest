'use strict'
const requireAll = require('require-all')
const _ = require('lodash')
const fs = require('fs')
const { ioc } = require('@adonisjs/fold')
const prettyHrTime = require('pretty-hrtime')
const SeedFiles = require('../../database/seed')


const { Command } = require('@adonisjs/ace')

class TmjSeed extends Command {
    constructor (Helpers, Database) {
        super()
        this._seedsPath = Helpers.seedsPath()
        this.Database = Database
    }

    _getSeedFiles (selectedFiles, path) {
        return requireAll({
            dirname: this._seedsPath + '/' + path,
            filter: (fileName) => {
                if (!selectedFiles && fileName.match(/(.*)\.js$/)) {
                    return fileName
                }

                return _.find(selectedFiles, (file) => file.trim().endsWith(fileName))
            }
        })
    }

    //Custom function in requiring files in a certain order
    _getSeedFilesInOrder(directory) {
        let filesToBeSeeded = (!directory)
            ? this._withoutDirectory()
            : this._withDirectory(directory);
        return filesToBeSeeded;
    }

    _withDirectory(directory) {
        let path = this._seedsPath + '/' + directory;
        return this._validateFiles(directory, path);
    }

    _withoutDirectory() {
        let filesToBeSeeded = {};

        for (let dir in SeedFiles) {
            let directory = SeedFiles[dir].directory;
            Object.assign(filesToBeSeeded, this._withDirectory(directory));
        }

        return filesToBeSeeded;
    }

    _validateFiles(directory, path) {
        if (!fs.existsSync(path)) return;

        let allFiles = SeedFiles[directory].files;
        let filesToBeSeeded = {};

        for (let file of allFiles) {
            filesToBeSeeded[file] = require(path + '/' + file);
        }

        return filesToBeSeeded;
    }

    _validateState (force) {
        if (process.env.NODE_ENV === 'production' && !force) {
            throw new Error('Cannot run seeds in production. Use --force flag to continue')
        }
    }

    static get signature () {
        return `tmj:seed
        { directory? : Directory for series seeding }
        { -f, --force: Forcefully seed database in production }
        { -a, --keep-alive: Do not close database connection when seeder.run finishes }
        { --files=@value: Run only selected files }
        { --path=@value: Folder to run seeds}
        `
    }

    static get description () {
        return 'Tell something helpful about this command'
    }

    static get inject () {
        return ['Adonis/Src/Helpers', 'Adonis/Src/Database']
    }


    async handle (args, { force, files, keepAlive, path }) {
        let allFiles = {}
        try {
            this._validateState(force)

            const startTime = process.hrtime()

            files = typeof (files) === 'string' ? files.split(',') : null

            path ?
                allFiles = this._getSeedFiles(files, path) :
                allFiles = this._getSeedFilesInOrder(args.directory)

            if (!_.size(allFiles)) {
                return this.viaAce ? this.info('Nothing to seed') : 'Nothing to seed'
            }

            for (const file of _.keys(allFiles)) {

                const seedInstance = ioc.make(allFiles[file])
                this.info('File: ', file)
                if (typeof (seedInstance.run) === 'function') {
                    await seedInstance.run()
                } else {
                    this.warn(`${seedInstance.constructor.name} does not have a run method`)
                }
            }

            const endTime = process.hrtime(startTime)
            this.success(`Seeded database in ${prettyHrTime(endTime)}`)
        } catch (error) {
            console.log(error)
        }

        /**
       * Close the connection when seeder are executed and keep alive is
       * not passed
       */
        if (!keepAlive) {
            this.info('Database is now closed.');
            this.Database.close()
        }
    }
}

module.exports = TmjSeed
