// app/routes.js

var account = require('../controllers/AccountController');
var files   = require('../controllers/FileController_server');
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



	app.route('/api/upload')
		.post(files.upload);

	app.route('/api/delete')
		.delete(files.delete);

	app.route('/api/getfiles')
		.get(files.getfiles);

//To handle all other routes
	app.get('*', function(req, res) {
		// console.log('CSRF request token = ' + req.csrfToken());
		res.sendfile('./public/index.html'); // load our public/index.html file
	});
}
