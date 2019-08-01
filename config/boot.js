var async = require('async');
var MongoDB = require('../lib/mongodb');
var BcryptUtils = require('../lib/bcryptUtils');

module.exports = function (next) {

    // set data
    var user = {
      userName : "Admin Admin",
      email : "tugayarican@gmail.com",
      password: "asd1234",
      isAdmin: true,
    };
  
    async.waterfall([
      // check admin
      function (callback) {
        var findParams = {
          isAdmin: true, 
          collectionName: 'userRegisterSchema'
        }
        MongoDB.findOne(findParams, function (err, found) {
          callback(err, found);
        });
      },
      // create admin if not exists
      function (exAdmin, callback) {
        if (!exAdmin) {
          BcryptUtils.hash(user.password, function (err, hashedPassword) {
            user.password = hashedPassword
            MongoDB.insertOne(user, function (err, created) {
              callback(err, created);
            });
          });
        }
        else {
          callback(null, exAdmin);
        }
      }
    ],
      function (err) {
        if(next) {
          next(err);
        }
        else {
          return err;
        }
      }
    );
  
};
