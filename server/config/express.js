/**
 * Module dependencies.
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var helmet = require('helmet');
var compression = require('compression');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpack = require('webpack');
var webpackConfig = require('../../webpack.config');
require('dotenv').config();
require('dotenv').config();

var constant = require(__dirname + '/constants');

var compiler = webpack(webpackConfig);

module.exports = function (app) {

    console.log('Initializing Express');

    // view engine setup
    app.set('views', constant.viewsDir);
    app.set('view engine', 'pug');

    // Express HMR
    app.use(webpackDevMiddleware(compiler, {
        hot: true,
        filename: 'bundle.js',
        publicPath: '/assets/',
        contentBase: __dirname + '/public/js',
        stats: {
            colors: true,
        },
        historyApiFallback: true,
    }));

    app.use(webpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
    }));

    // uncomment after placing your favicon in /public
    // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

    app.use(cors());
    app.use(helmet());
    app.use(compression());
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(express.static(constant.assetsDir));

};
