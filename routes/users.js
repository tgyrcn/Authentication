var express = require('express');
var router = express.Router();
var async = require('async');

var Schema = require(__basedir + '/schema/userRegisterSchema');
var MongoDB = require(__basedir + '/lib/mongodb');

// login get
router.get('/login', function(req,res,next) {
    res.render("homeGetLogin");
});

// login post
router.post('/login', function(req,res,next) {
    const userName = req.body.userName;
    const password = req.body.password;

    if (userName == 'Admin Admin' && password == 'asd1234') {
        res.redirect("/home");
    }
    else {
        res.redirect('/users/login');
    }
});

//register get
router.get('/register', function(req,res,next) {
    res.render("homeRegister");
});

//register post
router.post('/register', async function(req,res,next) {
    var userName = req.body.userName;
    var email = req.body.email;
    var password = req.body.password;
    var params = {userName: userName, email:email, password:password};

    var response = await MongoDB.findOne(params);
    console.log(response)

    //res.redirect('/');
})

module.exports = router;

