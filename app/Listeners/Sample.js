const BroadcastListenContract = use ('App/Services/Broadcaster/BroadcastListenContract')
const BroadcastEvent = use('BroadcastEvent')
const SampleEvent = use('App/Events/Sample')
class Sample extends BroadcastListenContract {

    handle(data, socket) {
        console.log('received data', data)
        let dataToConstructor = {
            name: 'Data to constructor',
            desc: 'this data is to be pass in event constructor'
        }

        BroadcastEvent.fire(new SampleEvent(dataToConstructor))
    }

    eventName() {
        return 'sample-event'
    }
}

module.exports = Sample
