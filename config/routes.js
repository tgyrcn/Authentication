var express = require('express');
var router = express.Router();

module.exports = function(app) {
    app.use('/', require(__basedir + '/routes/index'));
    app.use('/users', require(__basedir + '/routes/users'));
    app.use('/home', require(__basedir + '/routes/home'));
}