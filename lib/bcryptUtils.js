'use strict';

var bcrypt = require('bcryptjs');

/**
 * Hash value by salt
 * @param {string} value : Value to hash
 * @param {integer} salt : Salt value
 * @param {function} next : Callback function (error, hashaedValue)
 */
function hash(value, salt, next) {

    if (typeof salt == "function") {
        next = salt;
        salt = 10
    }

    bcrypt.hash(value, salt, function (err, hashedValue) {
        next(err, hashedValue);
    });
};

/**
 * Compare value1 by value2
 * @param {string} value1 : Value to compare
 * @param {string} value2 : Value to compare
 * @param {function} next : Callback function (error, isValid)
 */
function compare(value1, value2, next) {
    bcrypt.compare(value1, value2, function (err, valid) {
        next(err, valid);
    })
};

exports.hash = hash;
exports.compare = compare;