const webpack = require('webpack')
const path = require('path')

module.exports = {
    resolve: {
        alias: {
            'logger': path.resolve(__dirname, './logger')  // <-- When you build or restart dev-server, you'll get an error if the path to your logger.js file is incorrect.
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            'logger': 'logger'
        })
    ],
    output: {
        chunkFilename: 'dist/chunks/[name].[chunkhash].js'
    }
}