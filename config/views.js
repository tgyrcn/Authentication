var path = require('path');

module.exports = function(app) {
    app.set('views', path.join(__basedir, 'views'));
    app.set('view engine', 'pug');
}