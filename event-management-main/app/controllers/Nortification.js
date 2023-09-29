const Nortification = require('../models/Nortification.js');
const Student = require('../models/Student.js');
const Volunteer = require('../models/Volunteer.js');
const Event_Manager = require('../models/Event_Manager.js');

async function remove(req, res){

	if(await Student.exists({_id:req.params.pid})){
		await Nortification.findOne({student:req.params.pid, _id:req.params.nid}).deleteOne();
		res.status(200).json({message:'Nortification deleted'});
	}
	else if(await Volunteer.exists({_id:req.params.pid})){
		await Nortification.findOne({volunteer:req.params.pid, _id:req.params.nid}).deleteOne();
		res.status(200).json({message:'Nortification deleted'});
	}
	else if(await Event_Manager.exists({_id:req.params.pid})){
		await Nortification.findOne({event_manager:req.params.pid, _id:req.params.nid}).deleteOne();
		res.status(200).json({message:'Nortification deleted'});
	}

}

module.exports = { remove }
