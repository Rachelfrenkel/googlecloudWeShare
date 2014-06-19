/** 
 * Module dependencies.
 */
var mongoose = require('mongoose');
Schema = mongoose.Schema;

/** 
 * Nerd Schema
*/
var NerdSchema = new Schema({
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now },
	name: { type: String, required: true },
	email: { type: String, required: true },
	science: {type: String, required: true }
});

/** 
 * Validations
 */
NerdSchema.path('name').validate(function(name){
	return name.length;
}, 'Name cannot be blank');
NerdSchema.path('email').validate(function(email){
	return email.length;
}, 'Email cannot be blank');
NerdSchema.path('science').validate(function(science){
	return science.length;
}, 'Science cannot be blank');

/**
 * Statics
 */
NerdSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Nerd', NerdSchema);