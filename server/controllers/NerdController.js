require('../models/Nerd');
var mongoose = require('mongoose'),
	Nerd = mongoose.model('Nerd');
var util = require('util');

// Nerd.load('53a2ef304e9147db6f000001', function(err, nerd) {
//     console.log('nerd = ' + nerd);
//     // if (err) return next(err);
//     // if (!nerd) return next(new Error('Failed to load piece ' + id));
//     // next();
// });


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
    var nerd = req.body;
    Nerd.remove({ _id: req.body._id}, function(err) {
        if (err) {
            res.render('error', { status: 500 });
        } else {
            res.jsonp(nerd);
        }
    });
};

exports.hi = function(req, res, id) {
    Nerd.load(id, function(err, nerd) {
        return nerd;
    });
}

/**
 * Find nerd by id
 */
exports.nerd = function(req, res, next, id) {
    Nerd.load(id, function(err, nerd) {
        if (err) return next(err);
        if (!nerd) return next(new Error('Failed to load nerd ' + id));
        console.log('nerd = ' + util.inspect(nerd));
        req.nerd = nerd;
        next();
    });
};