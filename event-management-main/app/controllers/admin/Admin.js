const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../../models/Admin.js');
const Student = require('../../models/Student.js');
const Volunteer = require('../../models/Volunteer.js');
const Event_Manager = require('../../models/Event_Manager.js');
const Participant = require('../../models/Participant.js');
const Event_Member = require('../../models/Event_Member.js');
const Feedback = require('../../models/Feedback.js');
const Wishlist = require('../../models/Wishlist.js');
const Nortification = require('../../models/Nortification.js');
const Event_Category = require('../../models/Event_Category.js');
const Event = require('../../models/Event.js');
const Contact_Admin = require('../../models/Contact_Admin.js');

async function login(req, res){
	const username = req.body.username;
	const password = req.body.password;
	try{
		const admin = await Admin.findOne({username});
		if(await bcrypt.compare(password, admin.password)){
			req.session.admin = jwt.sign({role:'admin'}, process.env.JWT_SECRET_KEY);
			res.status(200).json({message:'Login Successfully'});
		}
		else{
			res.status(400).json({message:'Password is Wrong'});
		}		
	}
	catch(err){
		res.status(400).json({message:'can\'t login'});	
	}
}

function logout(req, res){
	if(req.session.admin){
		req.session.admin = null;
	}
	res.redirect('/admin');
}

async function delete_event(req, res){
	// AFTER DELETE EVENT PUSH NORTIFICATION TO PARTICIPANTS, VOLUNTEERS, EVENT-MANAGERS
	const participant = await Participant.find({event:req.params.id});
	const volunteer = await Event_Member.find({event:req.params.id});
	const event = await Event.findOne({_id:req.params.id});

	// NORTIFICATION TO PARTICIPANTS...
	for(let i=0; i<participant.length; i++){
		await Nortification.create({
			student: participant[i].student,
			message: `${event.name} event is removed by Admin` 
		})
	}

	// NORTIFICATION TO VOLUNTEERS...
	for(let i=0; i<volunteer.length; i++){
		await Nortification.create({
			volunteer: volunteer[i].volunteer,
			message: `${event.name} event is removed by Admin` 
		})
	}

	// NORTIFICATION TO EVENT-MANAGER...
	await Nortification.create({
		event_manager: event.event_manager,
		message: `${event.name} event is removed by Admin` 
	})
	
	// DELETE ALL THE RELATED THING...
	await Feedback.find({event:req.params.id}).deleteMany();
	await Wishlist.find({event:req.params.id}).deleteMany();
	await Participant.find({event:req.params.id}).deleteMany();
	await Volunteer.find({event:req.params.id}).deleteMany();
	await Event.findOne({_id:req.params.id}).deleteOne();
	res.status(200).json({message:'Event Deleted From Website Successfully....'});
}

async function delete_participant(req, res){
	await Feedback.find({student:req.params.id}).deleteMany();
	await Nortification.find({student:req.params.id}).deleteMany();
	await Wishlist.find({student:req.params.id}).deleteMany();
	await Participant.find({student:req.params.id}).deleteMany();
	await Student.findOne({_id:req.params.id}).deleteOne();
	res.status(200).json({message:'Participant Deleted From Website Successfully....'});
}

async function delete_volunteer(req, res){
	await Feedback.find({volunteer:req.params.id}).deleteMany();
	await Nortification.find({volunteer:req.params.id}).deleteMany();
	await Wishlist.find({volunteer:req.params.id}).deleteMany();
	await Event_Member.find({volunteer:req.params.id}).deleteMany();
	await Volunteer.findOne({_id:req.params.id}).deleteOne();
	res.status(200).json({message:'Volunteer Deleted From Website Successfully....'});
}


async function delete_event_manager(req, res){
	await Feedback.find({event_manager:req.params.id}).deleteMany();
	await Nortification.find({event_manager:req.params.id}).deleteMany();
	await Event_Manager.findOne({_id:req.params.id}).deleteOne();
	await Event.find({event_manager:req.params.id}).updateMany({
		person_name : 'Anonymous',
		person_mobile : 1000000000
	});
	res.status(200).json({message:'Event Manager Deleted From Website Successfully....'});
}


async function contact_admin(req, res){
	await Contact_Admin.create({
		email:req.body.email,
		details:req.body.details
	});
	res.status(201).json({message:'Your request sent successfully!'});
}

async function delete_admin_nortification(req, res){
	await Contact_Admin.findOne({_id:req.params.id}).deleteOne();
	res.status(200).json({message:'Nortification Deleted From Website Successfully....'});
}

async function block_participant(req, res){
	const student = await Student.findOne({_id:req.params.id});	
	if(student.block!==true){
		await Student.findOne({_id:req.params.id}).updateOne({block:true});
		res.status(200).json({message:true});		
	}
	else{
		await Student.findOne({_id:req.params.id}).updateOne({block:false});
		res.status(200).json({message:false});		
	}
}

async function block_volunteer(req, res){
	const volunteer = await Volunteer.findOne({_id:req.params.id});
	if(volunteer.block!==true){
		await Volunteer.findOne({_id:req.params.id}).updateOne({block:true});
		res.status(200).json({message:true});
	}
	else{
		await Volunteer.findOne({_id:req.params.id}).updateOne({block:false});
		res.status(200).json({message:false});
	}
}

async function block_event_manager(req, res){
	const event_manager = await Event_Manager.findOne({_id:req.params.id});
	if(event_manager.block!==true){
		await Event_Manager.findOne({_id:req.params.id}).updateOne({block:true});
		res.status(200).json({message:true});
	}
	else{
		await Event_Manager.findOne({_id:req.params.id}).updateOne({block:false});
		res.status(200).json({message:false});
	}
}

module.exports = { 
					login,
					delete_event,
					delete_participant,
					delete_volunteer,
					delete_event_manager,
					block_participant,
					block_volunteer,
					block_event_manager,
					contact_admin,
					delete_admin_nortification,
					logout 
				}