const mongoose = require('mongoose');

const event_memberSchema = mongoose.Schema({
	volunteer:{
		type:mongoose.Schema.Types.ObjectId, 
		ref: 'Volunteer',
		require: true
	},
	event:{
		type:mongoose.Schema.Types.ObjectId, 
		ref: 'Event',
		require: true
	},
	request_status:{
		type:Boolean
	}
});

const Event_Member = mongoose.model('Event_Member', event_memberSchema);

module.exports = Event_Member;
