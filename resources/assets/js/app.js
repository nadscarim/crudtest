import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AppBar from "./shared/components/AppBar";

class App extends Component {
    render() {
        return (
            <div>
                <AppBar />
                hello world
            </div>
        )
    }
}


if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}