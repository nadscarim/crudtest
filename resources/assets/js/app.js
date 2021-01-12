import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import FoobarContainer from './foobar/FoobarContainer'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
    render() {
        return (
            <div>
                <FoobarContainer />
            </div>
        )
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'))
}
