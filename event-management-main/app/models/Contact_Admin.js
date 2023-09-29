const mongoose = require('mongoose');

const contact_adminSchema = mongoose.Schema({
	email:{
		type:String,
		require: [true, 'Email Address is required!']
	},
	details:{
		type:String,
		require: [true, 'Details Field is required!']
	}
});

const Contact_Admin = mongoose.model('Contact_Admin', contact_adminSchema);

module.exports = Contact_Admin;