import React, { Component } from 'react'

export default class FoobarContainer extends Component {
    handleClick() {
        console.log('foobar')
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Click me!</button>
            </div>
        )
    }
}