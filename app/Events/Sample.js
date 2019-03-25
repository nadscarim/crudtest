
const BroadcastEvent = use('App/Services/Broadcaster/BroadcastEventContract')

class Sample extends BroadcastEvent {

    constructor(data) {
        super()
        console.log('constructing event data', data)

        this.sampleData = data
    }

    /**
     * Data to be send when the event was emitted.
     * @return object
     */
    data() {
        // input logic here

        return this.sampleData
    }

    /**
     * Event Channel to be broadcasted.
     * @return array
     */
    // broadcastOn() {
    //
    // }

    /**
     * Event Name to be broadcast
     * @return string
     */
    broadcastAs() {
        return 'sample-event-emit'
    }
}

module.exports = Sample
