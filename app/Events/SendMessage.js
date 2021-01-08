const BroadcastEvent = use('App/Services/Broadcaster/BroadcastEventContract')

class SendMessage extends BroadcastEvent {
    constructor(data) {
        super()
        console.log('constructing event data', data)

        this.message = data
    }

    /**
     * Data to be send when the event was emitted.
     * @return object
     */
    data() {
        // input logic here
        console.log(this.data)
        const payload = {
            type: 'PUSH_MESSAGE',
            payload: this.message
        }

        return this.message
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
        return 'onHomeAction'
    }
}

module.exports = SendMessage
