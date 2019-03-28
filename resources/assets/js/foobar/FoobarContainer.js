import React, { Component } from 'react'
import TmjPrompt from '../shared/TmjPrompt'
import { axios } from '../shared/bootstrap'
import SampleSocketIO from '../sample/sample-socketio/SampleSocketIOContainer'
import SampleReduxSocketIOContainer from '../sample/sample-redux-socketio/SampleReduxSocketIOContainer'
import SampleReactLoadableRouterContainer from '../sample/sample-react-loadable-router/SampleReactLoadableRouterContainer'
import SampleFormDialog from '../sample/material-ui/modals/SampleFormDialog'
import SampleTextFields from '../sample/material-ui/forms/SampleTextFields'
import SampleFormValidation from '../sample/material-ui/forms/SampleFormValidation'
import SampleSimpleTable from '../sample/material-ui/tables/SampleSimpleTable'
import SampleEnhancedTable from '../sample/material-ui/tables/SampleEnhancedTable'

export default class FoobarContainer extends Component {
    handleClick() {
        TmjPrompt.success('foobar')
        console.log('foobar')
        axios.get('/')
    }

    render() {
        logger.log('from logger')
        return (
            <div>
                <button onClick={this.handleClick}>Click me!</button>
                {/* <SampleSocketIO /> */}
                <SampleReduxSocketIOContainer />
                <SampleReactLoadableRouterContainer />
                <SampleFormDialog />
                <SampleTextFields />
                <SampleFormValidation />
                <SampleSimpleTable />
                <SampleEnhancedTable />
            </div>
        )
    }
}