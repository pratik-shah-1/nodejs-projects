const mongoose = require('mongoose');

const Socket_IdSchema = mongoose.Schema({
	user_id:String,
	role:String,
	socket_id:String
});


const Socket_Id = mongoose.model('Socket_Id', Socket_IdSchema);

module.exports = Socket_Id;