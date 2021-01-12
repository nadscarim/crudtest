import axios from 'axios'
import TmjPrompt from '../TmjPrompt'

class AxiosConfig {
    constructor() {
        this.axios = axios
        this.setDefaultHeaders()
        this.setInterceptor()
        return this.axios
    }

    setDefaultHeaders() {
        this.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    }

    setInterceptor() {
        this.axios.interceptors.response.use((response) => response, this._setErrorInterceptor)
    }

    _setErrorInterceptor(error) {
        logger.log('Error: ', error)
        // standard handling of error
        this._handleErrorMessage(error)
        // still return the error for further manipulation
        return Promise.reject(error)
    }

    _handleErrorMessage(error) {
        if (error.response) return this.showError(error.response.data)
        if (error.request) return this.showError(error.request)
        return this.showError(error.message)
    }

    showError(message) {
        TmjPrompt.error(message)
    }
}

export default AxiosConfig
