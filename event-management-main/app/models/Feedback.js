const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
	event_manager:{
		type:mongoose.Schema.Types.ObjectId, 
		ref: 'Event_Manager'
	},
	volunteer:{
		type:mongoose.Schema.Types.ObjectId, 
		ref: 'Volunteer'
	},
	student:{
		type:mongoose.Schema.Types.ObjectId, 
		ref: 'Student'
	},
	event:{
		type:mongoose.Schema.Types.ObjectId, 
		ref: 'Event',
		require: true
	},
	feedback:{
		type:String,
		default:""
	}
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
