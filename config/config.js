var keys = require('./keys');
module.exports = {
    db: `mongodb://${keys.un}:${keys.pw}@ds221631.mlab.com:21631/movshow`,
    port: 3000
}