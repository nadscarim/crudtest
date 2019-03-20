import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AppBar from "./shared/components/AppBar";
import FoobarContainer from './foobar.module/FoobarContainer';

class App extends Component {
    render() {
        return (
            <div>
                <AppBar />
                hello world
                <FoobarContainer />
            </div>
        )
    }
}


if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}