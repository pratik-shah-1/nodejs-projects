const jwt = require('jsonwebtoken');

const Feedback = require('../models/Feedback.js');
const Student = require('../models/Student.js');
const Event_Manager = require('../models/Event_Manager.js');
const Volunteer = require('../models/Volunteer.js');

async function add(req, res){
	const feedback = {event: req.body.event, feedback: req.body.feedback}
	const jwtres = await jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
	const role = jwtres.role;
	const _id = jwtres._id;

	if(role=='student'){
		feedback.student = _id;
	}
	else if(role=='volunteer'){
		feedback.volunteer = _id;
	}
	else if(role=='event_manager'){
		feedback.event_manager = _id;
	}
	const result = await Feedback.create(feedback);
	res.status(201).json({message:"Feedback given is successfully"});		

}

async function remove_all(req, res){
	const result = await Feedback.deleteMany({event:req.params.id});
	res.status(200).json({message:"Delete all feedback from perticular event"});
}

module.exports = {
					add, 
					remove_all
				}