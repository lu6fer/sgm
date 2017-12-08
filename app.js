var express = require('express');
var seeder = require('./server/config/seeder');
var app = express();

require('babel-register')({
    presets: ['env']
});

// Initialize express
require('./server/config/express')(app);

// Initialize routes
require('./server/config/routes')(app);

// Initialize database
require('./server/config/database');

// Initialize passport
require('./server/config/passport')(app);

// Seeding data
seeder();

var HttpStatus = require('http-status-codes');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = HttpStatus.UNAUTHORIZED;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    res.render('error');
});

var listenPort = process.env.PORT || '3000';
app.listen(listenPort, (error) => {
    if (!error) {
        console.log('App started : 0.0.0.0:' + listenPort); // eslint-disable-line
    }
});

module.exports = app;
