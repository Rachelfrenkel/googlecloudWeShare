require('../models/Account');
var mongoose = require('mongoose'),
	Account = mongoose.model('Account');
var util = require('util');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

exports.login = function(req, res, next) {

console.log("LOGGING IN");
    passport.authenticate('local-login', function(err, user, info){
        if (err) 
            return next(err);

        if (!user) { 
            console.log("didn't find user");
            return res.send({success: false, message: 'login failed'});
            //return res.json(403, {message: info.message});

        }
        console.log("signed up!");
        req.login(user, function(err) {
            if (err) return next(err);
            return res.json({user: user});
            // return res.send({success: true, message: 'login succeeded'});
        });
    })(req, res, next);
};


exports.register = function(req, res, next) {
    console.log("REGISTERING");
    passport.authenticate('local-signup', function(err, user, info) {
        if (err) 
            return next(err);

        if (!user) { 
            console.log("didn't find user");
            return res.send({success: false, message: 'signup failed'});
        }
        console.log("signed up!");
        req.login(user, function(err) {
            if (err) return next(err);

            // return res.send({success: true, message: 'signup succeeded'});
        });
    })(req, res, next);
};


    // console.log('Creating a new user...');

    // var user = new Account({ username : req.body.username, password : req.body.password });
    // // var user = new Account(req.body);

    // user.save(function(err) {
    //     console.log("making account");
    //     if (err) {
    //         console.log("error registering user: " + err);
    //         // res.render('error', {status: 500});  
    //         res.send(err);
    //         // return res.render('register', { info: "Sorry. That username already exists, please try again."});
    //     } else {
    //         // res.jsonp(user);
    //         // res.send('Saved user');
    //         passport.authenticate('local')(req, res, function () {
    //             console.log("created account");
    //             res.send('Account was successfully created');
    //         });
    //     }
    // });
// };








