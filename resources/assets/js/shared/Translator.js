'use strict';

/*-------
    - Based on https://github.com/kingleuther/bes-translation library
    - Simple conversion only, path already accessible on window
    - use case:
    `import Translation`
-------*/

function Translator() {
    if (!(this instanceof Translator)) return new Translator();
}

Translator.prototype = {
    trans
}

// get object from js object
function trans(translation, key) {
    if (typeof translation != 'string') {
        return 'First parameter should be string';
    }

    if (!translation) return 'Translation not found';

    // convert object to array
    var args = translation.split('.');
    
    // get the returned object from json object
    var object = args[0];

    return conversion(object, key);
   
}

// replace this logic with something else
function conversion (object, key) {
    if (key) {
        if (typeof key != 'object') {
            return 'Your search param should be an object';
        }
        var numberOfKeys = Object.keys(key).length;
        for (var ctr = 0; ctr < numberOfKeys; ctr++) {
            var searchKey = Object.keys(key)[ctr].toString();
            if (ctr == 0) {
                var newCurr = object.replace('{' + searchKey + '}', key[searchKey]);
            }
            newCurr = newCurr.replace('{' + searchKey + '}', key[searchKey]);
        }
        
        return newCurr;
    }
    return object;
}

module.exports = Translator();