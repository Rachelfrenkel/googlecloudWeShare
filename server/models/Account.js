// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var Account = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// methods ======================
// generating a hash
Account.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
Account.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
// module.exports = mongoose.model('User', Account);

module.exports = mongoose.model('Account', Account);


// 'use strict';

// var mongoose = require('mongoose'),
//     Schema = mongoose.Schema,
//     passportLocalMongoose = require('passport-local-mongoose');

// var Account = new Schema({
//     username: {type: String, required: true, unique: true},
//     password: {type: String, required: true}
// });

// Account.plugin(passportLocalMongoose);

// module.exports = mongoose.model('Account', Account);

// //ADD new controllers and services to index.html, app.js

