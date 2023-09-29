const mongoose = require('mongoose');

const nortificationSchema = mongoose.Schema({
	student:{
		type:mongoose.Schema.Types.ObjectId,
		ref : 'Student'
	},
	volunteer:{
		type:mongoose.Schema.Types.ObjectId,
		ref : 'Volunteer'
	},
	event_manager:{
		type:mongoose.Schema.Types.ObjectId,
		ref : 'Event_Manager'
	},
	message:{
		type:String,
		require:true
	}
});


const Nortification = mongoose.model("Nortification", nortificationSchema);

module.exports = Nortification;