global.__basedir = __dirname;

var express = require('express');
var path = require('path');
var async = require('async');
var fs = require('fs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
require('jsonminify');

var mongodb = require(__basedir + '/lib/mongodb');
// express application
var app = express();

var appConfig = JSON.parse(JSON.minify(fs.readFileSync(__basedir + '/appConfig.json', 'utf8')));
mongodb.configure(appConfig.database);
require(__basedir + '/config/boot')();

// express url encoded
app.use(express.urlencoded({extended: false}));

// static public
app.use(express.static(path.join(__basedir, 'public')));

// cookie parser
app.use(cookieParser());

// express-session
require(__basedir + '/config/session')(app);

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// pug middleware
require('./config/views')(app);

// route middleware
require('./config/routes')(app);

//configuration
async function configureAndConnect() {
  let connection = await mongodb.connect();
  if (connection && connection.err) {
    console.log(connection.err);
  }
}

configureAndConnect();

var PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('App listening on port' +' '+PORT);
});