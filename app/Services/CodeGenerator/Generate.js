'use strict'
/**
 * Generator of code
 * @author Offshore Lab
 * @copyright TMJ Engineers 2018
 */

class Generate {
    /**
     * @param {object} config - the config for the generator
     * @param {GeneratorSourceContract} source - an object that implements GeneratorSourceContract
     */
    constructor(manager) {
        this.manager = manager
    }

    produce(type, lastSequence, patternName, config) {
        let pattern = this.manager.driver(patternName)
        let newSequence = pattern.generateNewSequence(lastSequence)
        let code = pattern.produce(type, newSequence, config)

        return {
            getSequence: () =>{
                return newSequence
            },
            getCode: () => {
                return code
            }
        }
    }
}

module.exports = Generate
