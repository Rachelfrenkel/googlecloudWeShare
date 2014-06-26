require('../models/Nerd');
var mongoose = require('mongoose'),
	Nerd = mongoose.model('Nerd');
var util = require('util');


/**
 * Set a 'nerd' object to the request object
 */
exports.nerd = function(req, res, next, id) {
    Nerd.load(id, function(err, nerd) {
        if (err) return next(err);
        if (!nerd) return next(new Error('Failed to load nerd ' + id));
        req.nerd = nerd;
        next();
    });
};


/**
 * List of all nerds
 */
exports.find = function(req, res) {
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
            res.render('error', { status: 500 });
        } else {
            console.log('nerd created!');
            res.jsonp(nerd);
        }
    });
};


/** 
 * Delete a nerd
 */
exports.destroy = function(req, res) {
    console.log('Deleting a nerd...');

    // var nerd = req.nerd;
    // var nerdId = req.nerd._id; //If we want to return a nerd object in our response..
    var nerdId = req.params.id;
    Nerd.remove({ _id: nerdId}, function(err) {
        if (err) {
            res.render('error', { status: 500 });
        } else {
            res.send('Nerd was successfully deleted!');
        }
    });
};


exports.update = function(req, res) {
    res.send('Nerd was successfully updated');

};
