import React from 'react'
import { AvField, AvGroup } from 'availity-reactstrap-validation'
import Translator from 'Shared/translator'

/**
 * type -> accepts text, email, password, etc.
 * name -> accepts string name of your field,
 * value->accepts string value of your field,
 * onChange->function that handles onChange from parent,
 * label -> accepts string as label display
 * validate->function implementation of validation
 *
 * this.props.rules accepts ONLY object with `key` as the rule and the value as the value
 *
 * this.props.errorMessage overrides the default error message
 * accepts object with `key` as the rule and the value as the error messge
 */

class TMJField extends React.Component {
    constructor(props) {
        super(props)
        this._getValidation = this._getValidation.bind(this)
        this.fieldLabel = this.props.label || this.props.name
        this.validation = window.translations.shared.validation

        this.defaultValidation = {
            minLength: 'min',
            required: 'required',
            match: 'equals',
            email: 'email',
            maxLength: 'max'
        }
    }

    _getDefaultMessage(key, value) {
        let defaultValidation = this.defaultValidation[key]
        return Translator.trans(this.validation[defaultValidation], { field: this.fieldLabel, value })
    }

    _getValidation() {
        if (!this.props.rules) return
        let rules = { ...this.props.rules }
        let validationRules = {}

        Object.entries(rules).forEach(([key, value]) => {
            validationRules[key] = {
                value,
                errorMessage: this._getErrorMessage(key, value)
            }
        })
        return validationRules
    }

    _getErrorMessage(key, value) {
        let objErrorMessage = { ...this.props.errorMessage }
        return objErrorMessage[key] || this._getDefaultMessage(key, value)
    }

    _renderChildren() {
        return this.props.type === 'select' ? this.props.children : null
    }

    render() {
        return (
            <AvGroup>
                <AvField
                    type={this.props.type}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    label={this.props.label}
                    placeholder={this.props.placeholder}
                    disabled={this.props.disabled || false}
                    validate={this._getValidation()}
                >
                    { this._renderChildren() }
                </AvField>
            </AvGroup>
        )
    }
}

export default TMJField
