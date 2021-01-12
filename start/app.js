'use strict'

const Helpers = use('Helpers')
const appRoot = Helpers.appRoot()

/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const providers = [
    '@adonisjs/framework/providers/AppProvider',
    '@adonisjs/framework/providers/ViewProvider',
    '@adonisjs/lucid/providers/LucidProvider',
    '@adonisjs/bodyparser/providers/BodyParserProvider',
    '@adonisjs/cors/providers/CorsProvider',
    '@adonisjs/shield/providers/ShieldProvider',
    '@adonisjs/session/providers/SessionProvider',
    '@adonisjs/auth/providers/AuthProvider',
    '@adonisjs/antl/providers/AntlProvider',
    '@adonisjs/validator/providers/ValidatorProvider',
    'adonis-mongoose-model/providers/MongooseProvider',
    // appRoot + '/app/Providers/AppServiceProvider',
    // appRoot + '/app/Providers/SocketProvider',
    appRoot + '/app/Providers/BroadcastServiceProvider',
    appRoot + '/app/Providers/CodeGeneratorServiceProvider'
    // appRoot + '/app/Providers/JobProvider',
]

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
    '@adonisjs/lucid/providers/MigrationsProvider'
]

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {}

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = [
    'App/Commands/TmjLocale',
    'App/Commands/TmjSeed',
    'App/Commands/TmjMigration/TmjMigrationUp',
    'App/Commands/TmjMigration/TmjMigrationRollBack',
    'App/Commands/TmjMigration/TmjMigrationMake',
    'App/Commands/TmjMigration/TmjMigrationRunAll',
    'App/Commands/TmjMigration/TmjMigrationRollBackAll',
    'App/Commands/TmjMigration/TmjMigrationRefresh'
]

module.exports = {
    providers, aceProviders, aliases, commands
}
