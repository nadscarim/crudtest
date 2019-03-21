const axios = require('axios');

import TmjPrompt from '../TmjPrompt';

function AxiosConfig() {
    if (!(this instanceof AxiosConfig)) return new AxiosConfig();

    this.axios = axios;

    this.setDefaultHeaders();
    this.setInterceptor();

    return this.axios;
}

AxiosConfig.prototype = {
    setDefaultHeaders,
    setInterceptor
}

function setDefaultHeaders() {
    this.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}

function setInterceptor() {
    this.axios.interceptors.response.use((response) => {
        return response;
    }, _setErrorInterceptor);
}

function _setErrorInterceptor(error) {
    console.log('Error: ', error);
    // standard handling of error
    _handleErrorMessage(error);
    // still return the error for further manipulation
    return Promise.reject(error);
}

function _handleErrorMessage(error) {
    if (error.response)
        return showError(error.response.data);
    else if (error.request)
        return showError(error.request)

    // else
    return showError(error.message);
}

function showError(message) {
    TmjPrompt.error(message);
}

export default AxiosConfig();
