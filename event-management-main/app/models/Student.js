const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
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

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
