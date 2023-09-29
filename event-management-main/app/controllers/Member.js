const jwt = require('jsonwebtoken');

const Event = require('../models/Event.js');
const Event_Member = require('../models/Event_Member.js');
const Nortification = require('../models/Nortification.js');
const Wishlist = require('../models/Wishlist.js');

async function request(req, res){
	const jwtres = await jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
	const role = jwtres.role;
	const _id = jwtres._id;

	if(role=='volunteer'){
		if(!await Event_Member.exists({volunteer:_id,event:req.body.event})){
			const event_member = await Event_Member.create({
				event : req.body.event,
				volunteer : _id
			});
			await Wishlist.deleteOne({event:req.body.event, volunteer:_id});
			res.status(201).json({message:"Request post succeed"});
		}
		else{
			res.status(400).json({message:"Already Requested on this Event"});			
		}
	}

}

async function accept(req, res){
	await Event_Member.findOne({event:req.params.event, volunteer:req.params.id}).updateOne({request_status:true})
	res.status(200).json({message:"Request accept successfully..."});
}

async function reject(req, res){
	await Event_Member.findOne({event:req.params.event,volunteer:req.params.id}).updateOne({ request_status : false });
	res.status(200).json({message:"Request rejected"});
}

async function remove(req, res){
	const event = await Event.findOne({_id:req.params.event});

	// PUSH NORTIFICATION INTO A DATABASE...
	await Nortification.create({
		volunteer : req.params.id, 
		message : `You are removed from ${event.name} event by Event-Manager`,
		event : req.params.event
	});
	
	await Event_Member.findOne({
		volunteer : req.params.id, 
		event : req.params.event
	}).deleteOne();

	res.status(200).json({message:"Person is removed"});
}

module.exports = {
					request, 
					accept, 
					reject, 
					remove
				};