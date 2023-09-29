const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
	student:{
		type:mongoose.Schema.Types.ObjectId, 
		ref: 'Student'
	},
	volunteer:{
		type:mongoose.Schema.Types.ObjectId, 
		ref: 'Volunteer',
	},
	event:{
		type:mongoose.Schema.Types.ObjectId, 
		ref: 'Event',
		require: true
	}
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
