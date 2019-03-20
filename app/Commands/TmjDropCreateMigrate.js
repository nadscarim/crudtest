"use strict"

const { Command } = require("@adonisjs/ace")
const mysql = require("mysql")
const Env = use("Env")
const ace = require("@adonisjs/ace")
const util = require("util")

class TmjDropCreateMigrate extends Command {
    static get signature() {
        return `tmj:create-db
        { -m, --migrate: Run all migrations }
        `
    }

    static get description() {
        return "Drop, create, migrate MySQL database"
    }

    async _dropDatabase() {
        this.info("Dropping database...")
        let query = `DROP DATABASE IF EXISTS ${this.db.name};`
        await this.db.query(query)
    }

    async _createDatabase() {
        this.info("Creating database...")
        let query = `CREATE DATABASE IF NOT EXISTS ${this.db.name} CHARACTER SET utf8 COLLATE utf8_general_ci;`
        await this.db.query(query)
    }

    async _runMigration() {
        this.info("Running migration...")
        await ace.call("tmj:migration-run-all", {}, {})
    }

    async handle(_args, options) {
        let params = {
            host: Env.get("DB_HOST"),
            user: Env.get("DB_USER"),
            password: Env.get("DB_PASSWORD")
        }
        let connection = mysql.createConnection(params)
        let query = util.promisify(connection.query).bind(connection)
        this.db = {
            ...params,
            name: Env.get("DB_DATABASE"),
            connection,
            query
        }

        await this._dropDatabase()
        await this._createDatabase()
        if (options.migrate) await this._runMigration()
        await this.db.connection.end()
        this.success("Done")
    }
}

module.exports = TmjDropCreateMigrate
