const mongoose = require('mongoose');

const event_categorySchema = mongoose.Schema({
	name:{
		type:String,
		unique:true,
		require:true
	},
});

const Event_Category = mongoose.model('Event_Category', event_categorySchema);

module.exports = Event_Category;
