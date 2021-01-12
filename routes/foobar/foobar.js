'use strict'

const Route = use('Route')

Route.group(() => {
    Route.get('', 'FoobarController.view')
    Route.get('config.js', 'ConfigController.index')
    Route.get('translation.js', 'TranslationController.index')
}).prefix('foobar').namespace('Foobar')
