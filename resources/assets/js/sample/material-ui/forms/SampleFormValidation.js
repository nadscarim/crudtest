/**
 * https://github.com/NewOldMax/react-material-ui-form-validator
 * A form validation example with custom rules
 */
import React from 'react'
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'

// ResetPasswordForm
export default class SampleFormValidation extends React.Component {

    state = {
        user: {
            password: '',
            repeatPassword: '',
        },
    };

    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.user.password) {
                return false
            }
            return true
        })
    }

    handleChange = (event) => {
        const { user } = this.state
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    handleSubmit = () => {
        // your submit logic
        console.log('submitted')
    }

    render() {
        const { user } = this.state

        return (
            <ValidatorForm
                onSubmit={this.handleSubmit}
            >
                <TextValidator
                    label="Password"
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={user.password}
                />
                <TextValidator
                    label="Repeat password"
                    onChange={this.handleChange}
                    name="repeatPassword"
                    type="password"
                    validators={['isPasswordMatch', 'required']}
                    errorMessages={['password mismatch', 'this field is required']}
                    value={user.repeatPassword}
                />
                <Button type="submit">Submit</Button>
            </ValidatorForm>
        )
    }
}