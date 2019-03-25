'use strict'


class PatternContract {

    generateNewSequence(lastSequence, records) {
        throw new Exception('please declare the generateNewSequence function')
    }

    produce(type, lastSequence, config) {
        throw new Exception('please declare the produce function')
    }

}

module.exports = PatternContract
