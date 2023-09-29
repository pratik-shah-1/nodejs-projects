const moment = require('moment');
const jwt = require('jsonwebtoken');
const slugify = require('slugify');

const Event = require('../models/Event.js');
const Participant = require('../models/Participant.js');
const Event_Member = require('../models/Event_Member.js');
const Feedback = require('../models/Feedback.js');
const Wishlist = require('../models/Wishlist.js');
const Nortification = require('../models/Nortification.js');

async function filter(req, res){

	const filterObj = {}

	if((req.body.paid === 'false' && req.body.free === 'true') || (req.body.paid === 'true' && req.body.free === 'false')){
		if(req.body.free === 'true')
			filterObj.type = 'free';
		if(req.body.paid === 'true')
			filterObj.type = 'paid';		
	}		
	if(req.body.certificate === 'true')
		filterObj.certificate = true;
	if(req.body.winner === 'true')
		filterObj.winner = true;

	var events = await Event.find(filterObj);
	var date_events = [];

	// EXACT MATCH BETWEEN THIS DATES...
	if(req.body.start_date!=="" && req.body.end_date!==""){
		for(let i=0; i<events.length; i++){
			var start_date = moment(events[i].start_date,'DD/MM/YYYY').format('YYYY-MM-DD');
			start_date = new Date(start_date);
			var end_date = moment(events[i].end_date,'DD/MM/YYYY').format('YYYY-MM-DD');
			end_date = new Date(end_date);
			if(moment(start_date).isAfter(req.body.start_date) && moment(end_date).isBefore(req.body.end_date)){
				date_events.push(events[i]);
			}
		}		
		events = date_events;
	}

	// ONLY IF START-DATE ENTER... THEN SHOW EVENT AFTER THAT DATE...
	else if(req.body.start_date!==""){
		for(let i=0; i<events.length; i++){
			var start_date = moment(events[i].start_date,'DD/MM/YYYY').format('YYYY-MM-DD');
			start_date = new Date(start_date);
			if(moment(start_date).isSameOrAfter(new Date(req.body.start_date))){
				date_events.push(events[i]);
			}
		}		
		events = date_events;
	}

	// ONLY IF END-DATE ENTER... THEN SHOW EVENT BEFORE THAT DATE...
	else if(req.body.end_date!==""){
		for(let i=0; i<events.length; i++){
			var end_date = moment(events[i].end_date,'DD/MM/YYYY').format('YYYY-MM-DD');
			end_date = new Date(end_date);
			if(moment(end_date).isSameOrBefore(new Date(req.body.end_date))){
				date_events.push(events[i]);
			}
		}		
		events = date_events;
	}

	if(req.body.expired === 'true'){
		for(let i=0; i<events.length; i++){
			var end_date = moment(events[i].end_date,'DD/MM/YYYY').format('YYYY-MM-DD');
			end_date = new Date(end_date);
			var today = moment().format('YYYY-MM-DD');
			today = new Date(today);
			if(!moment(end_date).isSame(today) && moment(end_date).isBefore(today)){
				events[i].expire = true;
			}
		}
		events = events.filter((event) => event.expire == true);
	}
	res.status(200).json(events);
	
}

async function check_event_type(req, res){
	const event = await Event.findOne({_id:req.params.id});
	if(event.type=='paid'){
		res.status(200).json({message:'paid'});
	}
	else if(event.type=='free'){
		res.status(200).json({message:'free'});
	}
}

async function check_event_date(req, res){
	const jwtres = await jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
	const role = jwtres.role;
	const _id = jwtres._id;

	const current_event = await Event.findOne({_id:req.params.id});
	var current_event_start_date = moment(current_event.start_date,'DD/MM/YYYY').format('YYYY-MM-DD');
	current_event_start_date = new Date(current_event_start_date);
	var arr = [];
	var temp = [];

	if(role=='student'){
		const participated_events = await Participant.find({student:_id}).populate('event');
		temp = participated_events;
	}
	else if(role=='volunteer'){
		const requested_events = await Event_Member.find({volunteer:_id}).populate('event');
		temp = requested_events;
	}

	if(temp.length>0){
		for(let i=0; i<temp.length; i++){
			var start_date = moment(temp[i].event.start_date,'DD/MM/YYYY').format('YYYY-MM-DD');
			var end_date = moment(temp[i].event.end_date,'DD/MM/YYYY').format('YYYY-MM-DD');
			start_date = new Date(start_date);
			end_date = new Date(end_date);
			if(moment(current_event_start_date).isSame(start_date)){
				arr.push(temp[i].event);
			}
			else if(moment(current_event_start_date).isBetween(start_date, end_date)){
				arr.push(temp[i].event);
			}

		}
		res.status(200).json(arr);
	}
	else{
		res.status(200).json(arr);
	}

}

async function check_event_name(req, res){
	if(req.params.name!==""){
		if(req.params.name.length>=3){
			const slug = slugify(req.params.name.toLowerCase());
			const events  = await Event.find({ name : {$regex: new RegExp(`.*${req.params.name}.*`) , $options: 'i'}});
			const slug_match = await Event.findOne({slug});
			if(slug_match!==null){
				res.status(409).json({message:`Event name is Already Taken by another user...`});
			}
			else if(events.length!==0){
				var temp = "";
				for(let i=0; i<events.length; i++){
					temp += `${events[i].name}, `;
				}
				res.status(200).json({message:`Event name is similary like other events name`});
				// res.status(200).json({message:`Event name is similary like ${temp} your event name must be unique`});
			}					
			else{
				res.status(200).json({message:'ok'});
			}
		}
		else{
			res.status(200).json({message:'ok'});
		}
	}
	else{
		res.status(200).json({message:'ok'});
	}
}

async function add(req, res){
	const jwtres = await jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
	const role = jwtres.role;
	const _id = jwtres._id;
	
	if(role=='event_manager'){
		if(!await Event.exists({name:req.body.name})){
			const event = await Event.create({
				slug: slugify(req.body.name.toLowerCase()),
				event_manager: _id,
				name: req.body.name,
				category: req.body.category,
				details: req.body.details,
				...((req.file) && {image: req.file.path.replace('public','')}),
				certificate: (req.body.certificate=='true')? true: false,
				winner: (req.body.winner=='true')? true: false ,
				type: req.body.type,
				amount: req.body.amount,
				location: req.body.location, 
				capacity: req.body.capacity, 
				start_time: moment(`2018-04-02 ${req.body.start_time}`).format("hh:mm A"),
				end_time: moment(`2018-04-02 ${req.body.end_time}`).format("hh:mm A"),
				start_date: moment(req.body.start_date).format('DD/MM/YYYY'),
				end_date: moment(req.body.end_date).format('DD/MM/YYYY'),
				person_name : req.body.person_name,
				person_mobile : req.body.person_mobile
			});
			res.status(200).json({message:"Event added successfully", event});
		}
		else{
			res.status(409).json({message:'Event name must be unique'});
		}
	}
	else{
		res.status(401).json({message:"User not authorized!"});
	}

}

async function update(req, res){
	const jwtres = await jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
	const role = jwtres.role;
	const _id = jwtres._id;

	const participants = await Participant.find({event:req.params.id});
	const volunteers = await Event_Member.find({event:req.params.id});
	const event = await Event.findOne({_id:req.params.id});


	if(role=='event_manager'){
		await Event.findOne({_id:req.params.id}).updateOne({
			event_manager: _id,
			slug: slugify(req.body.name.toLowerCase()),
			name: req.body.name,
			category: req.body.category,
			details: req.body.details,
			...((req.file) && {image: req.file.path.replace('public','')}),
			certificate: (req.body.certificate=='true')? true: false,
			winner: (req.body.winner=='true')? true: false ,
			type: req.body.type,
			amount: req.body.amount,
			location: req.body.location, 
			capacity: req.body.capacity, 
			start_time: moment(`2018-04-02 ${req.body.start_time}`).format("hh:mm A"),
			end_time: moment(`2018-04-02 ${req.body.end_time}`).format("hh:mm A"),
			start_date: moment(req.body.start_date).format('DD/MM/YYYY'),
			end_date: moment(req.body.end_date).format('DD/MM/YYYY'),
			person_name : req.body.person_name,
			person_mobile : req.body.person_mobile,
			cancel:false
		});
	

		// NORTIFICATION TO ALL PARTICIPANTS THIS EVENT IS UPDATE...
		for(let i=0; i<participants.length; i++){
			await Nortification.create({
				student:participants[i].student,
				message:`${event.name} is Updated by Event-Manager`
			});
		}

		// NORTIFICATION TO ALL VOLUNTEERS THIS EVENT IS UPDATE...
		for(let i=0; i<participants.length; i++){
			await Nortification.create({
				volunteer:participants[i].student,
				message:`${event.name} is Updated by Event-Manager`
			});
		}

		// NORTIFICATION TO ALL VOLUNTEERS THIS EVENT IS UPDATE...
		await Nortification.create({
			event_manager:event.event_manager,
			message:`${event.name} is Updated by You`
		})

		res.status(200).json({message:"Event update successfully"});
	}

}


async function cancel(req, res){
	
	const participants = await Participant.find({event:req.params.id});
	const volunteers = await Event_Member.find({event:req.params.id});
	const event = await Event.findOne({_id:req.params.id});

	// NORTIFICATION TO ALL PARTICIPANTS THIS EVENT IS CANCEL...
	for(let i=0; i<participants.length; i++){
		await Nortification.create({
			student:participants[i].student,
			message:`${event.name} is Cancel by Event-Manager`
		});
	}

	// NORTIFICATION TO ALL VOLUNTEERS THIS EVENT IS CANCEL...
	for(let i=0; i<participants.length; i++){
		await Nortification.create({
			volunteer:participants[i].student,
			message:`${event.name} is Cancel by Event-Manager`
		});
	}

	// NORTIFICATION TO ALL VOLUNTEERS THIS EVENT IS CANCEL...
	await Nortification.create({
		event_manager:event.event_manager,
		message:`${event.name} is Cancel by You`
	});
	await Event.findOne({_id:req.params.id}).updateOne({cancel:true});

	res.status(200).json({message:'Event is Cancel'});
}

module.exports = {
					add, 
					update, 
					cancel,
					check_event_name,
					check_event_type,
					check_event_date,
					filter
				};