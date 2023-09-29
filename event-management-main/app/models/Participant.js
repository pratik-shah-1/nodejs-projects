const mongoose = require('mongoose');

const participantSchema = mongoose.Schema({
	student:{
		type:mongoose.Schema.Types.ObjectId, 
		ref: 'Student',
		require: true
	},
	event:{
		type:mongoose.Schema.Types.ObjectId, 
		ref: 'Event',
		require: true
	},
	payment:{
		type:String,
		require:true
	},
	winner:{
		type:Boolean,
		default:false
	},
	certificate:{
		type:Boolean,
		default:false,
	},
	request:{//This field is for when participant want's to remove from the event
		type:String,
		default:''
	}

});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;
