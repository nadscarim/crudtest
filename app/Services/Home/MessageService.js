'use strict'

const BroadcastEvent = use('BroadcastEvent')
const SendMessageEvent = use('App/Events/SendMessage')

class MessageService {
    constructor() {

    }

    async send() {

        let newMessage = {foo: 'bar'}

        BroadcastEvent.fire(new SendMessageEvent(newMessage))
    }

}

module.exports = MessageService