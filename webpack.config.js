var webpack = require('webpack')
var path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'), 
        filename: 'build/bundle.js',
        sourceMapFilename: 'build/bundle.map'
    },
    watch: true,
    devtool: '#source-map',
    module: {
        rules: [
            {
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
}