'use strict'

class FoobarController {
    async view({ antl, view }) {
        let page = antl.formatMessage('shared.title', { page: 'Welcome' })
        console.log(page)
        return view.render('foobar.foobar', {
            page: 'Welcome'
        })
    }
}

module.exports = FoobarController
