
const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
	event_manager:{
		type:mongoose.Schema.Types.ObjectId, 
		ref: 'Event_Manager',
		require: true
	},
	name:{
		type:String,
		require:true,
		unique:true
	},
	slug:{
		type:String,
		require:true,
		unique:true
	},
	category:{
		type:String,
		require:true
	},
	details:{
		type:String,
		require:true
	},
	image:{
		type:String,
		require:true
	},
	certificate:{
		type:Boolean,
		require:true,
	},
	winner:{
		type:Boolean,
		require:true
	},
	type:{
		type:String,
		require:true
	},
	amount:{
		type:Number,
		default:0
	},
	location:{
		type:String,
		require:true
	},
	capacity:{
		type:String,
		require:true
	},
	start_time:{
		type:String,
		require:true
	},
	end_time:{
		type:String,
		require:true
	},
	start_date:{
		type:String,
		require:true
	},
	end_date:{
		type:String,
		require:true
	},
	person_name:{
		type:String,
		require:true
	},
	person_mobile:{
		type:Number,
		require:true
	},
	cancel:{
		type:Boolean
	}
	
},{timestamps:true});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
