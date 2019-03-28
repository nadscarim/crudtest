
class GeneratorSourceContract {

    produce(type) {
        throw new Exception('please declare the produce function')
    }
}

module.exports = GeneratorSourceContract
