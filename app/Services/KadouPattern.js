'use strict'

/**
 * Default Pattern for Code Generator
 * @author Offshore Lab
 * Pattern
 * Station-typeCode-YY-requested-typePattern-5randomNum-checkSum
 * KDB-SCD-18-01-000999-52390-12
 */

const DefaultPattern = require('./CodeGenerator/Pattern/DefaultPattern')

class KadouPattern extends DefaultPattern {
    constructor(config, randomConfig) {
        super(config, randomConfig)

    }

    produce(type, lastSequence, config) {
        let defaultMin = this.randomConfig.min
        let defaultMax = this.randomConfig.max
        let pattern = this.config
        let year =  (new Date().getFullYear()).toString()
        // lastSequence = this.generateNewSequence(lastSequence);

        let code = [
            pattern.station,
            pattern.types[type].code,
            year.slice(-2),
            pattern.types[type].requested[config.requested],
            this.generateNumber(lastSequence, pattern.types[type].pattern),
            this.generateRandom(defaultMin, defaultMax),
        ]

        return code.join('-')
    }
}

module.exports = KadouPattern
