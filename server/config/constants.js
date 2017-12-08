var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
    root: rootPath,
    modelsDir: rootPath + '/models',
    viewsDir: rootPath + '/views',
    assetsDir: rootPath + '/public',
    secret:'Mff6hu0GaLB7R3v1i0iwV8U26B6KNHP4',
    defaultPassword: 'Subalcatel!',
    jwt: {
        algorithm: 'HS256',
        issuer: 'sgm',
        audience: 'sgm',
        expiresIn: '1h'
    },
};


