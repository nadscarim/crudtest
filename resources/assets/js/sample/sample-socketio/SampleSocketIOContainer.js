import React from 'react'
import io from 'socket.io-client'

// based on reactstrap sample at: https://reactstrap.github.io/components/tabs/
class SampleSocketIO extends React.Component {
    constructor() {
        super()
        this.onClick = this.onClick.bind(this)

        //initialize socket
        this.socket = io(window.config.shared.socketData.uri)

        this.socket.on('sample-event-emit', (data) => {
            console.log('received the data from server', data)
            // console.log('emitting in 10s ...')
            // setTimeout(() => {
            //     this.onClick()
            // }, 10000)
        })
    }

    onClick() {
        console.log('emitted')
        this.socket.emit('sample-event', 'this is a sample')
    }

    // Row and Col components are used for display options only; can be replaced with custom components
    render() {
        return (
            <button onClick={this.onClick}>Emit Something!</button>
        )
    }
}

export default SampleSocketIO
