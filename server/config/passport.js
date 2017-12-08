var passport = require('passport');

require('../middlewares/passport')(passport);

module.exports = function (app) {
    console.log('Initialize Passport');
    
    app.use(passport.initialize());
};
