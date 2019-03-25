'use strict'
const DefaultPattern = require('./Pattern/DefaultPattern')
const PatternContract = require('./Pattern/PatternContract')

class PatternManager {

    constructor(config) {
        this.config = config

        this.establishedDriver = {}

        this.sourceDrivers = {
            default: this.createDefaultDriver.bind(this)
        }
    }

    driver(patternName) {
        return this.getDriver(patternName)
    }

    getDriver(patternName) {
        patternName = patternName || this.getDefaultDriver()

        return this.establishedDriver[patternName] = this.get(patternName)
    }

    get(name) {
        return this.establishedDriver.hasOwnProperty(name)
            ? this.establishedDriver[name]
            : this.resolve(name)
    }

    resolve(name) {

        // to prevent mutability
        const config = {...this.config.pattern[name]}

        if (!config) throw new Error('connection configuration for', name, 'was not specified')

        let driver = this.sourceDrivers[name](config, this.config.default.random)

        if (!(driver instanceof PatternContract))
            throw new Error('specified driver must implement ConnectionContract')

        return driver

    }

    createDefaultDriver(config, randomConfig) {
        return new DefaultPattern(config, randomConfig)
    }

    getDefaultDriver() {
        return this.config.default.pattern
    }

    extendDriver(name, callback) {
        this.sourceDrivers[name] = callback
    }
}

module.exports = PatternManager
