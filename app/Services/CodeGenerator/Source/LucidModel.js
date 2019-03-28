const GeneratorSourceContract = require('./GeneratorSourceContract')
class LucidModel extends GeneratorSourceContract {

    constructor(config) {
        super(config)
        this.config = config

        this.model = use(this.config.source)
    }

    // const CodeGenerator = use('CodeGenerator');
    async produce(type) {

        // get first if there is existing generated code
        let year =  (new Date().getFullYear()).toString()
        let generatedCode = await this.model.query().where('type', type)
            .where('year', year).first()

        if (!generatedCode) {
            generatedCode = new this.model
            generatedCode.year = year
            generatedCode.last_sequence = 0
            generatedCode.type = type
        }

        let newNumber = generatedCode.last_sequence = parseInt(generatedCode.last_sequence) + 1

        await generatedCode.save()

        let pattern = this.config.pattern

        let code = [
            pattern.station,
            pattern.types[type].code,
            year.slice(-2),
            this.generateNumber(newNumber, pattern.types[type].pattern),
            this.generateRandom(1000, 100000),
        ]

        return code.join('-')
    }

    generateNumber(newNumber, pattern) {
        newNumber = newNumber.toString()
        let length = newNumber.length
        pattern = pattern.slice(0, length * -1)
        return pattern + newNumber
    }

    generateRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}

module.exports = LucidModel
