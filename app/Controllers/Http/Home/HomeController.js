'use strict'

class HomeController {
    async view({ antl, view }) {
        let page = antl.formatMessage('shared.title', { page: 'Welcome' })
        return view.render('main.home', {
            page: 'Welcome'
        })
    }
}

module.exports = HomeController
