'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
    up() {
        this.create('tasks', (table) => {
            table.increments()
            table.string('task_title')
            table.string('comment', 300)
            table.timestamps()
        })
    }

    down() {
        this.drop('tasks')
    }
}

module.exports = TaskSchema
