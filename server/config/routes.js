/**
 *  Load the routes
 */
var index = require('../routes/index.routes');
var users = require('../routes/user.routes');
var auth = require('../routes/auth.routes');
var tank = require('../routes/tank.routes');
var bcd = require('../routes/bcd.routes');
var regulator = require('../routes/regulator.routes');

module.exports = function (app) {

    console.log('Initializing Routes');

    // Register the routes
    app.use('/', index);
    app.use('/api', auth);
    app.use('/api', users);
    app.use('/api', tank);
    app.use('/api', bcd);
    app.use('/api', regulator);
};