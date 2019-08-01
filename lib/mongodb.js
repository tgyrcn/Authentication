'use strict';
// https://mongodb.github.io/node-mongodb-native/#/

var MongoClient = require('mongodb').MongoClient;
var async = require('async');

var _configuration;
var _client;
var _db;

/**
 * Configure mongodb
 * @param {object} configuration : Configuration from appConfig.json
 */
function configure(configuration) {
    _configuration = configuration;
    _configuration.options = _configuration.options || {};
    _configuration.options.poolSize = _configuration.options.poolSize || 10;
    _configuration.options.useNewUrlParser = true;
};

/**
 * Connect to mongodb
 * @param {function} next : {err}
 */

async function connect2(){

    if (!_client || !_client.isConnected()) {

        try {
            let client = await new MongoClient(_configuration.connectionUrl, _configuration.options).connect()

            if(client){
                _client = client;
                _db = _client.db(_configuration.dbName);
            } 

        } catch (error) {
            return error
        }

    }
    
    else{
       return null
    }
}

/**
 * Close mongodb connection
 * @param {function} next : {err, result}
 */
function close(next) {
    // check client
    if (_client && _client.isConnected()) {
        // close client
        _client.close(function (err, result) {
            if (typeof next == "function") {
                next(err, result);
            }
        });
    }
    else {
        if (typeof next == "function") {
            next(null, null);
        }
    }
};

async function findOne(params) {

    try {

        await connect2();

        let document = await _db.collection(params.collectionName).findOne(params);
        return document;

    } catch (error) {
        return error;
    }


};


function insertOne(params, next) {

    async.waterfall([
        // connect to db
        function (callback) {
            connect(function (connectErr) {
                callback(connectErr);
            });
        },
        // insert document to db
        function (callback) {
            _db.collection('userLoginSchema').insertOne(
                params,
                function (err, results) {
                    var inserted = null;
                    if (results && results.result && results.result.ok == 1) {
                        if (results.insertedCount > 0 && results.ops && results.ops.length > 0) {
                            inserted = results.ops[0];
                        }
                    }
                    callback(err, inserted);
                }
            );
        }
    ],
        function (err, document) {
            if (typeof next == "function") {
                next(err);
            }
        }
    );
};


exports.configure = configure;
exports.connect2 = connect2;
exports.close = close;
exports.findOne = findOne;
exports.insertOne = insertOne;