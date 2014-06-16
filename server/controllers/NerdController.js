require('../models/Nerd');
var mongoose = require('mongoose'),
	Nerd = mongoose.model('Nerd');
var util = require('util');

/**
 * List of all nerds
 */
exports.find = function(req, res) {
    console.log('request body = ' + util.inspect(req.body));
    var nerdQuery = {};
    if (req.body._id){
        nerdQuery = {_id: req.body._id}
    }
    Nerd.find(nerdQuery, function(err, nerds) {
        if (err) {
            console.log('we got an error');
            res.render('error', { status: 500 });
        } else {
            res.jsonp(nerds);
        }
    });
};

/**
 * Create a nerd
 */
exports.create = function(req, res) {
    console.log('Creating a new nerd...');
    var nerd = new Nerd(req.body);
    nerd.save(function(err) {
        if (err) {
            console.log('nerd creation failed');
            return res.send('users/signup', {
                errors: err.errors,
                nerd: nerd
            });
        } else {
            console.log('nerd created!');
            res.jsonp(nerd);
        }
    });
};


// /** 
//  * Delete a nerd
//  */
// exports.delete = function(req, res) {
//     console.log('Deleting a nerd...');
//     var nerd = req.body;
//     nerd.remove(function(err) {
//         if (err) {
//             res.render('error', { status: 500 });
//         } else {
//             res.jsonp(nerd);
//         }
//     });
// };

exports.helloworld = function(){
    console.log('Hello world!');
};