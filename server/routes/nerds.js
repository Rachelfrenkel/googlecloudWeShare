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
		nerds.find(req,res);
	});

	app.post('/api/nerds', function(req, res){
		nerds.create(req,res);
	});

	app.delete('api/nerds', function(req,res){
		nerds.delete(req,res);
	});

	// route to handle delete (app.delete)

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load our public/index.html file
	});

};
