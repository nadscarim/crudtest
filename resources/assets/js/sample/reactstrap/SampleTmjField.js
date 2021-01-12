import React, { Component } from 'react'
import TmjField from 'Shared/components/TMJField'
import { AvForm } from 'availity-reactstrap-validation'

export class SampleTmjField extends Component {
    state = {
        name: ''
    }

    handleInputChange = (event) => {
        let { name, value } = event.target
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div>
                <AvForm>
                    <TmjField
                        type="text"
                        name="name"
                        label="Name"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        rules={{
                            required: true
                        }}
                    />
                    <button>Submit</button>
                </AvForm>
            </div>
        )
    }
}

export default SampleTmjField
