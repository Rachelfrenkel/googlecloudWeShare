// app/routes.js

var nerds = require('../controllers/NerdController');
var url = require('url') ;
var util = require('util');

module.exports = function(app, passport) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	//This line of code appends a "nerd" object to our request object
    app.param('id', nerds.nerd); 

	// app.use(function(req, res, next) {
	// 	if (req.isAuthenticated()){
	// 		return next();
	// 	}
	// 	return res.send('Session expired');
	// 	// res.redirect('/');
	// });

	app.route('/api/nerds')
		.get(nerds.find)
		.post(nerds.create);
	app.route('/api/nerds/:id')
		.delete(nerds.destroy)
		.put(nerds.update);

};
