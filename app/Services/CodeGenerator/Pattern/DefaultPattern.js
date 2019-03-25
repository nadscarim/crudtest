'use strict'

/**
 * Default Pattern for Code Generator
 * @author Offshore Lab
 * Pattern
 * Station-typeCode-YY-typePattern-5randomNum-checkSum
 * KDB-SU-18-000999-52390-12
 */

const PatternContract = require('./PatternContract')

class DefaultPattern extends PatternContract {
    constructor(config, randomConfig) {
        super(config)
        this.config = config
        this.randomConfig = randomConfig
    }

    produce(type, lastSequence = 0) {
        let defaultMin = this.randomConfig.min
        let defaultMax = this.randomConfig.max
        let pattern = this.config
        let year =  (new Date().getFullYear()).toString()
        // lastSequence = this.generateNewSequence(lastSequence);

        let code = [
            pattern.station,
            pattern.types[type].code,
            year.slice(-2),
            this.generateNumber(lastSequence, pattern.types[type].pattern),
            this.generateRandom(defaultMin, defaultMax),
        ]

        return code.join('-')
    }

    generateNewSequence(lastSequence) {
        return parseInt(lastSequence) + this.config.increment
    }

    /**
     * Generating New Number with the pattern specified
     */
    generateNumber(lastSequence, pattern) {
        lastSequence = lastSequence.toString()
        let length = lastSequence.length
        // add the new number at the end
        pattern = pattern.slice(0, length * -1)
        return pattern + lastSequence
    }

    generateRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}

module.exports = DefaultPattern
