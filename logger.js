module.exports = new Proxy(console, {
    get: (target, name) => {
        if (!(name in target)) {
            // console.log('Getting non-existant property \'' + name + '\'')
            return undefined
        }
        if (process.env.NODE_ENV !== 'development') {
            return typeof target[name] === 'function' ? new Function() : undefined
        }
        return target[name]
    },
    // set: (target, name, value) => {
    //     if (!(name in target)) {
    //         console.log('Setting non-existant property \'' + name + '\', initial value: ' + value)
    //     }
    //     target[name] = value
    // }
})