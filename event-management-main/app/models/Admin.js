const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
	username:{
		type:String,
		require:true
	},
	password:{
		type:String,
		min:6,
		require:true
	}
});


const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;