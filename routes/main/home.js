'use strict'

const Route = use('Route')

Route.group(() => {
    Route.get('home', 'HomeController.view')
    // Route.get('config.js', 'ConfigController.index')
    // Route.get('translation.js', 'TranslationController.index')
    Route.get('home/translation.js', 'TranslationController.index')
    Route.post('/home/save', 'TaskController.createTask')
    Route.post('/home/update', 'TaskController.updateTaskData')
    Route.post('/home/delete', 'TaskController.deleteTaskData')
    Route.post('/home/get', 'TaskController.fetchData')
}).namespace('Home')
