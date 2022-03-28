'use strict'

const Task = use('App/Models/DB/Task')

class TaskController {
    async fetchData({ response }) {
        try {
            const getTask = await Task
                .query()
                .fetch()
            let result = getTask.toJSON()

            return response.send({
                error: false,
                tasks: result
            })
        } catch (error) {
            return console.log(error)
        }
    }

    async createTask({ request }) {
        const form = request.all()

        const tasks = await Task.create({
            task_title: form.task_title,
            comment: form.comment
        })
    }

    async updateTaskData({ request }) {
        const form = request.all()

        await Task
            .query()
            .where('id', form.id)
            .update({
                task_title: form.task_title || null,
                comment: form.comment || null
            })
    }

    async deleteTaskData({ request, response }) {
        try {
            const form = request.all()

            await Task
                .query()
                .where('id', form.id)
                .delete()

            return response.redirect('/home')
        } catch (error) {
            return console.log(error)
        }
    }
}

module.exports = TaskController
