'use strict'

/*-------
    - Based on https://github.com/kingleuther/bes-translation library
    - Simple conversion only, path already accessible on window
    - use case:
    `import Translation`
-------*/

class Translator {
    // get object from js object
    trans(translation, key) {
        if (typeof translation !== 'string') {
            return 'First parameter should be string'
        }

        if (!translation) return 'Translation not found'

        // convert object to array
        let args = translation.split('.')

        // get the returned object from json object
        let object = args[0]

        return this.conversion(object, key)
    }

    // replace this logic with something else
    conversion(object, key) {
        if (key) {
            if (typeof key !== 'object') {
                return 'Your search param should be an object'
            }
            let numberOfKeys = Object.keys(key).length
            let newCurr
            for (let ctr = 0; ctr < numberOfKeys; ctr++) {
                let searchKey = Object.keys(key)[ctr].toString()
                if (ctr == 0) {
                    newCurr = object.replace('{' + searchKey + '}', key[searchKey])
                }
                newCurr = newCurr.replace('{' + searchKey + '}', key[searchKey])
            }
            return newCurr
        }
        return object
    }
}

export default new Translator()
