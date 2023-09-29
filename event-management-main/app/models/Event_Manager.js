const mongoose = require('mongoose');

const event_managerSchema = mongoose.Schema({
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
		require:true,
		min:8
	},
	confirm_passowrd:{
		type:String,
		require:true,
		min:8
	},
	block:{
		type:Boolean
	}

});

const Event_Manager = mongoose.model('Event_Manager', event_managerSchema);

module.exports = Event_Manager;
