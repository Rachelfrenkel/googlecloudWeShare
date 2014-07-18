// app/routes.js

var files   = require('./FileController_server');
var url = require('url') ;
var util = require('util');

module.exports = function(app) {
	
	app.route('/api/upload')
		.post(files.upload);

	app.route('/api/delete/:bucket/:file')
		.delete(files.destroy);

	app.route('/api/getfiles')
		.get(files.getfiles);

//To handle all other routes
	app.get('*', function(req, res) {
		// console.log('CSRF request token = ' + req.csrfToken());
		res.sendfile('./public/index.html'); // load our public/index.html file
	});
}
