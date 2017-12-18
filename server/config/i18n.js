var i18n = require('i18n');

module.exports = function(app) {
    i18n.configure({
        locales: ['en', 'fr'],
        // defaultLocale: 'fr',
        directory: __dirname + '/../i18n'
    });

    app.use(i18n.init);
};
