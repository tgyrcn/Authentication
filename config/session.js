var session = require('express-session');

module.exports = function(app) {
    var userSession = {
        secret : "users",
        resave : false,
        saveUninitialized : true
    }
    app.use('/', session(userSession));
}