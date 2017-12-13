'use strict';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    context: __dirname + '/client',

    entry: [
        'webpack-hot-middleware/client',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        './main.js',
    ],

    output: {
        path: __dirname + '/dist', //  destination
        filename: 'app.js',
        publicPath: '/assets/'
    },

    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                exclude: /components/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                sourceMap: true,
                                module: false,
                                importLoaders: 2
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                }))
            },
            {
                test: /\.css$/,
                use:['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: false,
                                sourceMap: true,
                                module: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                }))
            },
            {
                test: /\.(js|jsx)$/, //Check for all js files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: '10000',
                        name: './fonts/[hash].[ext]'
                    }
                }
            }
        ]
    },

    devServer: {
        hot: true,
        filename: 'app.js',
        publicPath: '/assets/',
        historyApiFallback: true,
        contentBase: __dirname + '/client',
    },

    devtool: "eval-source-map", // Default development sourcemap

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({
            filename: 'app.css',
            allChunks: true
        })
    ]
};

module.exports = config;