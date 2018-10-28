// Imports
const path = require('path');
const webpack = require('webpack');

// Plugins
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Check for development mode
const IS_DEV = process.env.NODE_ENV === 'development';

// Configurations
const PATHS = require('./paths.config');
const stats = require('./stats.config');

// Webpack Base Configuration
const config = {
    entry: path.join(PATHS.src, 'index.js'),
    stats: stats,
    output: {
        path: PATHS.build,
        pathinfo: true,
        publicPath: '/'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader'
                        //options: {}
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            }
        ]
    },
    plugins: [
        new Dotenv({
            path: path.join(PATHS.root, '.env'), // load this now instead of the ones in '.env'
            safe: false, // Load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
            systemvars: true, // Load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
            silent: false // Hide errors
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(PATHS.src, 'index.html')
        })
    ]
};

module.exports = config;
