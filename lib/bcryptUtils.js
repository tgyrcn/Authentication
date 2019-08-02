'use strict';

var bcrypt = require('bcryptjs');

/**
 * Hash value by salt
 * @param {string} value : Value to hash
 * @param {integer} salt : Salt value
 * @param {function} next : Callback function (error, hashaedValue)
 */
async function hash(value) {

    try { 
        let val = await bcrypt.hash(value, 10);
        console.log(val);
        return {
            error: null,
            data: val
        }
    }
    catch(error) {
            console.log(hata)
            return {
                data: null,
                err: hata
            } 
    }
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