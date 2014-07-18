// modules =================================================
var express = require('express');
var app     = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var csrf = require('csurf');
var mongoose = require('mongoose');
var passport = require('passport');
var util = require('util');
var bcrypt = require('bcrypt-nodejs');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var busboy = require('connect-busboy');
var cloud_storage = require('cloud-storage');


// configuration ===========================================
	
// config files
var db = require('./config/db');

var port = process.env.PORT || 8000; // set our port
mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 					// log every request to the console
app.use(methodOverride()); 					// simulate DELETE and PUT
app.use(bodyParser()); 						// pull information from html in POST
app.use(cookieParser());
app.use(session({secret: 'charleslief'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(busboy());

require('./config/passport')(passport); // pass passport for configuration


// var Account = require('./server/models/Account');
// passport.use(new LocalStrategy(Account.authenticate()));
// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());

// app.use(session({
//   keys: ['key1', 'key2'],
//   secureProxy: true // if you do SSL outside of node
// }));
// app.use(csrf());
// app.use(function (req, res, next) {
// 	console.log('req.session = ' + req.csrfToken());
//   res.cookie('_csrfToken', req.csrfToken());
//   next();
// });


// passport ===============================================

// routes ==================================================
require('./server/routes/nerds')(app, passport); // pass our application into our routes
require('./server/routes/accounts')(app, passport); // pass our application into our routes
require('./google-cloud/server/files')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app


