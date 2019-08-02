var async = require('async');
var MongoDB = require('../lib/mongodb');
var BcryptUtils = require('../lib/bcryptUtils');

module.exports = async () => {

    // set data
    const user = {
      userName : "AuthenticationApp",
      email : "tugayarican@gmail.com",
      password: "auth!1234",
      isAdmin: true,
    };

    let findParams = {
      isAdmin: true
    }
    let result = await MongoDB.findOne(findParams, "userSchema");
    if (result && result.err) {
      console.log(result.err);
    }
    let exAdmin = result.data;
    if (!exAdmin) {
      let response = await BcryptUtils.hash(user.password);
      if (response && response.err) {
        return err;
      }
      let hashedValue = response && response.data ? response.data : null;
      if (hashedValue) {
        user.password = hashedValue;
        let result = await MongoDB.insertOne(user,"userSchema");
        if (result && result.err) {
          return err;
        }
        let createdUser = result.data;
        if (createdUser) {
          console.info("Admin Oluşturuldu");
        }
      }
    }
}
  
