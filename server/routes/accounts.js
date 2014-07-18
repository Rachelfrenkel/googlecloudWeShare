// app/routes.js

var account = require('../controllers/AccountController');
var url = require('url') ;
var util = require('util');

module.exports = function(app, passport) {
	
	app.route('/api/register')
		.post(account.register);
		// 
	// app.post('/api/register', function(req, res, next){
	// 	account.register(req, res, next, passport);
	// })
		// .post(passport.authenticate('local'), account.register);
	app.route('/api/login')
		.post(account.login);
		// .get(account.loggingIn)

}
