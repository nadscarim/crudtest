const webpack = require('webpack')
const path = require('path')

module.exports = {
    resolve: {
        alias: {
            'logger': path.resolve(__dirname, './logger')
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