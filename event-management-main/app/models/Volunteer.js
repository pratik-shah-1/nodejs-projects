const mongoose = require('mongoose');

const volunteerSchema = mongoose.Schema({
	name:{
		type:String,
		require:true
	},
	email:{
		type:String,
		unique:true,
		require:true
	},
	mobile:{
		type:Number,
		min:10,
		unique:true,
		require:true
	},
	password:{
		type:String,
		min:8,
		require:true
	},
	confirm_passowrd:{
		type:String,
		min:8,
		require:true
	},
	block:{
		type:Boolean
	}
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;
