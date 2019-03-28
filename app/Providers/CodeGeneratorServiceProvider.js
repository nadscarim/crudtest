const { ServiceProvider } = require('@adonisjs/fold')

class CodeGeneratorServiceProvider extends ServiceProvider {
    register () {
        const Config = use('Config')
        let generatorConfig = Config.get('generator')

        this.app.singleton('CodeGeneratorPatternManager', () => {
            const CodeGeneratorPatternManager = use('App/Services/CodeGenerator/PatternManager')

            return new CodeGeneratorPatternManager(
                generatorConfig
            )
        })

        this.app.singleton('CodeGenerator', () => {
            const CodeGenerator = use('App/Services/CodeGenerator/Generate')
            const CodeGeneratorPatternManager = use('CodeGeneratorPatternManager')

            return new CodeGenerator(
                CodeGeneratorPatternManager,
            )
        })
    }

    boot() {
        const CodeGeneratorPatternManager = use('CodeGeneratorPatternManager')
        const KadouPattern = use('App/Services/KadouPattern')

        CodeGeneratorPatternManager.extendDriver('kadou', (config, randomConfig) => {
            return new KadouPattern(config, randomConfig)
        })
    }
}

module.exports = CodeGeneratorServiceProvider
