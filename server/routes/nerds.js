// app/routes.js

var nerds = require('../controllers/NerdController');
var url = require('url') ;
var util = require('util');

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes




	// sample api route
	app.get('/api/nerds', function(req, res) {
		// nerds.hi(req, res, '53a2ef304e9147db6f000001');
		console.log('GET request');
		nerds.find(req,res);
	});
	
	app.post('/api/nerds', function(req, res){
		console.log('POST request');
		nerds.create(req,res);
	});

	app.delete('api/nerds/:id', function(req,res){
		console.log('DELETE request');
		nerds.destroy(req,res);
	});

	// route to handle update (app.put)

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load our public/index.html file
	});

};
