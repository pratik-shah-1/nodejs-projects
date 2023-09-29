const jwt = require('jsonwebtoken');
const Event = require('../models/Event.js');
const Participant = require('../models/Participant.js');
const Wishlist = require('../models/Wishlist.js');
const Student = require('../models/Student.js');
const Nortification = require('../models/Nortification.js');

async function participate(req, res){
	const jwtres = await jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
	const role = jwtres.role;
	const _id = jwtres._id;

	if(role=='student'){
		const result = await Student.findOne({_id});
		if(!await Participant.exists({student:_id,event:req.body.event})){
			const participate = await Participant.create({
				student : result._id,
				event : req.body.event,
				payment : req.body.payment
			});			
			await Wishlist.deleteOne({event:req.body.event, student:result._id});
			res.status(200).json({message:"Participated successfully..."});							
		}
		else{
			res.status(400).json({message:"Already Participated"});										
		}
	}

}

async function remove(req, res){
	// PUSH NORTIFICATION INTO A DATABASE...
	const event = await Event.findOne({_id:req.params.event});

	await Nortification.create({
		student : req.params.id, 
		message : `You are removed from ${event.name} by Event-Manager`
	});

	await Participant.findOne({
		student : req.params.id, 
		event : req.params.event
	}).deleteOne();

	res.status(200).json({message:"Participant is removed"});
}

async function certificates(req, res){
	await Participant.find({event:req.params.id}).updateMany({certificate:true});
	res.status(200).json({message:"Certificate provided to all"});
}

async function no_certificates(req, res){
	await Participant.find({event:req.params.id}).updateMany({certificate:false});
	res.status(200).json({message:"Certificate not provided to all"});
}


async function no_certificate(req, res){
	await Participant.findOne({event:req.params.event, student:req.params.id}).updateOne({certificate:false});
	res.status(200).json({message:"Certificate provided"});
}

async function certificate(req, res){
	await Participant.findOne({event:req.params.event, student:req.params.id}).updateOne({certificate:true});
	res.status(200).json({message:"Certificate not provided"});
}

async function winner(req, res){
	await Participant.findOne({event:req.params.event, student:req.params.id}).updateOne({winner:true});
	res.status(200).json({message:"Declared as a Winner"});
}

async function looser(req, res){
	await Participant.findOne({event:req.params.event, student:req.params.id}).updateOne({winner:false});
	res.status(200).json({message:"Not-declared as a Winner"});
}


module.exports = {
					participate, 
				  	remove, 
				  	certificates,
				  	no_certificates,
				  	certificate,
				  	no_certificate,
				  	winner,
				  	looser
				  }