'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('welcome')
Route.get('/', ({ response }) => response.redirect('home'))

const Helpers = use('Helpers')
// const foobar = Helpers.appRoot('routes/foobar/')
const main = Helpers.appRoot('routes/main/')

// Nested route group not added in yet, as discussed at:
// https://github.com/adonisjs/adonis-framework/issues/33
require(main + 'home')

// Route.get('*', ({ response }) => response.redirect('/'))
