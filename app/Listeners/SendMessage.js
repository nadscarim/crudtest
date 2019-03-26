const BroadcastListenContract = use ('App/Services/Broadcaster/BroadcastListenContract')
const BroadcastEvent = use('BroadcastEvent')
const SendMessageEvent = use('App/Events/SendMessage')
class SendMessage extends BroadcastListenContract {

    handle(data, socket) {
        console.log('received data', data)
        let dataToConstructor = {
            type: 'CREATE_MESSAGE',
            payload: data.payload
        }

        BroadcastEvent.fire(new SendMessageEvent(dataToConstructor))
    }

    eventName() {
        return 'create-message'
    }
}

module.exports = SendMessage
