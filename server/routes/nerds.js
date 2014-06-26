// app/routes.js

var nerds = require('../controllers/NerdController');
var url = require('url') ;
var util = require('util');

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	//This line of code appends a "nerd" object to our request object
    app.param('id', nerds.nerd); 
	app.route('/api/nerds')
		.get(nerds.find)
		.post(nerds.create);
	app.route('/api/nerds/:id')
		.delete(nerds.destroy);

	// route to handle update (app.put)

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		console.log('called here');
		// console.log('CSRF request token = ' + req.csrfToken());
		res.sendfile('./public/index.html'); // load our public/index.html file
	});

};
