'use strict'

import swal from 'sweetalert2'

const translation = window.translations.shared.prompt

class TmjPrompt {
    success(successMessage, ...options) {
        let successText = successMessage
        if (!successMessage) {
            successText = translation.success.text
        }

        let defaultSuccessOptions = {
            type: 'success',
            title: translation.success.title,
            text: successText,
            showCancelButton: false,
            confirmButtonText: translation.button.okay,
            confirmButtonColor: '#59c9e7'
        }

        let successOptions = Object.assign({}, defaultSuccessOptions, ...options)

        return swal(successOptions)
    }

    error(errorMessage, ...options) {
        let errorText = errorMessage
        if (!errorMessage) {
            errorText = translation.fail.text
        }

        let defaultErrorOptions = {
            type: 'error',
            title: translation.fail.title,
            text: errorText,
            showCancelButton: false,
            confirmButtonText: translation.button.okay,
            confirmButtonColor: '#59c9e7'
        }

        let errorOptions = Object.assign({}, defaultErrorOptions, ...options)

        return swal(errorOptions)
    }

    warning(warningMessage, ...options) {
        let warningText = warningMessage
        if (!warningMessage) {
            warningText = translation.warning.text
        }

        let defaultErrorOptions = {
            type: 'warning',
            title: translation.warning.title,
            text: warningText,
            showCancelButton: true,
            confirmButtonText: translation.button.okay,
            confirmButtonColor: '#59c9e7'
        }

        let warningOptions = Object.assign({}, defaultErrorOptions, ...options)

        return swal(warningOptions)
    }

    show(promptMessage, ...options) {
        let promptText = promptMessage

        let defaultErrorOptions = {
            type: 'warning',
            title: translation.default.title,
            text: promptText,
            showCancelButton: true,
            confirmButtonText: translation.button.yes,
            confirmButtonColor: '#59c9e7',
            cancelButtonText: translation.button.no
        }

        let promptOptions = Object.assign({}, defaultErrorOptions, ...options)

        return swal(promptOptions)
    }

    custom(options) {
        // options is object of possible config at:
        // https://sweetalert2.github.io/#configuration
        return swal(options)
    }
}

export default new TmjPrompt()
