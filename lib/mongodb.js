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

async function connect(){

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

async function findOne(params, collectionName) {
    try {
        let document = await _db.collection(collectionName).findOne(params);
        return {
            err: null, 
            data: document
        };

    } catch (error) {
        return {
            err: error,
            data: null
        };
    }
};

async function canan() {
    try {
        var a;
        var sonuc = await setTimeout(function(){
            return 2*3;
        }, 3000);   
        if (sonuc) {
            return sonuc;
        }
        else return null;
    } catch (error) {
        return error;
    }
}

async function insertOne(params, collectionName) {

    try {
        let document = await _db.collection(collectionName).insertOne(params);
        var inserted = null;
        if (document && document.result && document.result.ok == 1) {
            if (document.insertedCount > 0 && document.ops && document.ops.length > 0) {
                inserted = document.ops[0];
                return {
                    err: null,
                    data: inserted                    
                }
            }
        }
    } catch (error) {
        return {
            err: error,
            data: null
        }
    }
};


exports.configure = configure;
exports.connect = connect;
exports.close = close;
exports.findOne = findOne;
exports.insertOne = insertOne;
exports.canan = canan;