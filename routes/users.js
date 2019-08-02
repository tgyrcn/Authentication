var express = require('express');
var router = express.Router();
var async = require('async');

var Schema = require(__basedir + '/schema/userSchema');
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

    var params = {
        userName: userName, 
        email:email, 
        password: password
    };
/*     var resCanan = await MongoDB.canan();
    console.log(resCanan); */
    var response = await MongoDB.findOne({email: email}, "userSchema");
    if(response) {
        if (response.err) {
            console.error("Hata Oluştu: " + response.err.message);
            res.redirect(req.originalUrl);
        }
        else if (response.data) {
            console.info("Böyle bir kullanıcı var. Lütfen başka bir mail adresi ile tekrar deneyin");
            res.redirect(req.originalUrl);
        }
        else {
            var user = await MongoDB.insertOne(params,"userSchema");
            if (user) {
                if (user.err) {
                    console.error("Hata Oluştu: " + response.err);
                    res.redirect(req.originalUrl);
                }
                else if (!user.data) {
                    console.error("Kullanıcı bilgisi alınamadı!");
                    res.redirect(req.originalUrl);
                }
                else {
                    console.log(user);
                    res.redirect('/');
                }
            }
            else {
                console.error("Hata Oluştu: " + new Date());
                res.redirect(req.originalUrl);
            }
        }
    } else {
        console.error("Response bulunamadı");
        res.redirect(req.originalUrl);
    }
})

module.exports = router;

