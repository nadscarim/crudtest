'use strict'

const { Command } = require('@adonisjs/ace')
const Helpers = use('Helpers')
const Antl = use('Antl')
const _ = require('lodash')
const fs = require('fs')
const path = require('path')

class Locale extends Command {
    static get signature () {
        return `
          tmj:locale-fill
          { code?=en : Specify code name of source folder. Default is 'en'}
          { --overwrite : Warning! Doing this replaces existing locale files}
        `
    }

    static get description () {
        return 'Copy locale directory and contents to other locales'
    }

    async handle (args, flags) {
        // get all available locales
        let { code } = args
        let localePath = Helpers.resourcesPath('locales/')
        let availableLocales = Antl.availableLocales()
        availableLocales = _.without(availableLocales, code)
        this.info('Copying translations from', code, 'to:', availableLocales)

        // assign source
        let sourcePath = localePath + code
        
        // loop over every abailable locale found
        availableLocales.forEach(localeDestDir => {
            let destPath = localePath + localeDestDir

            if (flags.overwrite) {
                this.warn('overwriting', localeDestDir, '...')
                return this._overWriteAll(sourcePath, destPath)
            }

            this.info('copying over to', localeDestDir, '...')
            this._copyOrAdd(sourcePath, destPath);
            
        })
        
        this.info('locales filled')
    }

    _copyOrAdd(sourcePath, destPath) {
        let sourceLocale = require("require-all")(sourcePath)
        let destLocale = require("require-all")(destPath)
        
        Object.keys(sourceLocale).forEach(key => {
            // where key is the fileName
            let sourceFilePath = path.resolve(sourcePath, key + '.js')
            let destFilePath = path.resolve(destPath, key + '.js')

            // if no file was found
            if (!(destLocale.hasOwnProperty(key))) {
                this.copy(sourceFilePath, destFilePath)
                this.info('Translation file has been created for', key)
                return
            }

            let defaultObject = sourceLocale[key]
            let destObject = destLocale[key]
            
            this._compareContent(defaultObject, destObject, destFilePath)
        })
    }
    
    _overWriteAll(sourcePath, destPath) {
        this.copy(sourcePath, destPath)
    }

    _compareContent(sourceObject, destObject, pathOfDestFile) {
        // let test = this._findMissingValue(sourceObject, destObject)
        // let missingValues = _.pick(sourceObject, test)
        let newLocaleObject = _.defaultsDeep(destObject, sourceObject)
        let content = 'module.exports = ' + JSON.stringify(newLocaleObject, null, 4) + ';'
        fs.writeFileSync(pathOfDestFile, content, {encoding: 'utf8'})
    }

    _findMissingValue(sourceObject, destObject) {
        let missingKeysArray = []
        for (let contentKey in sourceObject) {
        // check if not equal value or does not exist
            
            if (sourceObject[contentKey] != null  && typeof (sourceObject[contentKey]) === 'object') {
                if (!destObject[contentKey]) {
                    this.info('Missing property for',  contentKey, 'has been added')
                    destObject[contentKey] = this._findMissingValue(sourceObject[contentKey], destObject)
                    missingKeysArray.push(contentKey)
                }
            } 
            else { 
                this.info('Missing property for',  contentKey, 'has been added')
                destObject[contentKey] = sourceObject[contentKey]
                missingKeysArray.push(contentKey)
            }  
        }
        return missingKeysArray;
    }
}

module.exports = Locale
