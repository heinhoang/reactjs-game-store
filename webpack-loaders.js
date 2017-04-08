"use strict";

const webpack = require('webpack');
const PATH = require('./webpack-paths');

exports.devServer = function (options) {
    return {
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'errors-only',
            host: options.host,
            port: options.port,
            contentBase: './client/dist',
            proxy: {
                '/api': {
                    target: 'http://localhost:8080/api',
                    pathRewrite: {
                        '^/api': ''
                    }
                }
            }
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin({
                multistep: true
            })
        ]
    }
}

exports.css = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
    include: PATH.css
}

exports.font = {
    test: /\.ttf/,
    use: ['file-loader']
}

exports.babel = {
    test: /\.jsx?$/,
    use: ['babel-loader'],
    exclude: /node_modules/
}