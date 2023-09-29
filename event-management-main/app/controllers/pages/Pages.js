const path = require('path');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const Feedback = require('../../models/Feedback.js');
const Event = require('../../models/Event.js');
const Wishlist = require('../../models/Wishlist.js');
const Student = require('../../models/Student.js');
const Participant = require('../../models/Participant.js');
const Volunteer = require('../../models/Volunteer.js');
const Event_Member = require('../../models/Event_Member.js');
const Event_Manager = require('../../models/Event_Manager.js');
const Event_Category = require('../../models/Event_Category.js');
const Nortification = require('../../models/Nortification.js');

async function home(req, res){
	// FORMAT AND SORTING...
	var expired_events = [];
	var canceled_events = [];
	var active_events = [];

	var events = await Event.find({}).lean();
	// IF USER IF LOGGED?
	if(req.session.logged){
		const result = await jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
		const role = result.role;
		const _id = result._id;

		// STUDENT
		if(role=='student'){
			const wishlist = await Wishlist.find({student:_id}).lean();
			const participated = await Participant.find({student:_id}).lean();

			// WISHLIST
			for(let i=0; i<wishlist.length; i++){
				for(let j=0; j<events.length; j++){
					if(wishlist[i].event.toString()===events[j]._id.toString()){
						events[j].wishlist = true;
					}
				}
			}

			// PARTICIPATED
			for(let i=0; i<participated.length; i++){
				for(let j=0; j<events.length; j++){
					if(participated[i].event.toString()===events[j]._id.toString()){
						events[j].participated = true;
					}
				}
			}
		}

		// VOLUNTEERS
		else if(role=='volunteer'){
			const wishlist = await Wishlist.find({volunteer:_id}).lean();
			const event_member = await Event_Member.find({volunteer:_id}).lean();

			// WISHLIST
			for(let i=0; i<wishlist.length; i++){
				for(let j=0; j<events.length; j++){
					if(wishlist[i].event.toString()===events[j]._id.toString()){
						events[j].wishlist = true;
					}
				}
			}

			// REQUESTED EVENT
			for(let i=0; i<event_member.length; i++){
				for(let j=0; j<events.length; j++){
					if(event_member[i].event.toString()===events[j]._id.toString()){
						if(event_member[i].request_status==true)
							events[j].accepted = true;
						else if(event_member[i].request_status==false)
							events[j].rejected = true;
						else
							events[j].pending = true;
					}
				}					
			}
		}
	}

	// CHECK THE EVENT IS EXPIRE OR NOT and CANCELED OR NOT?
	for(let i=0; i<events.length; i++){
		var end_date = moment(events[i].end_date,'DD/MM/YYYY').format('YYYY-MM-DD');
		end_date = new Date(end_date);
		var today = moment().format('YYYY-MM-DD');
		today = new Date(today);
		// TODAY !== END_DATE AND END_DATE IS BEFORE TODAY 
		if(moment(end_date).isBefore(today) && !moment(end_date).isSame(today)){
			events[i].expire = true;
			expired_events.push(events[i]);
		}
		else if(events[i].cancel===true){
			canceled_events.push(events[i]);
		}
		else{
			active_events.push(events[i]);
		}
	}


	// THIS IS SORTING FIRST ACTIVE THEN CANCEL THEN EXPIRED EVENTS...
	events = active_events.concat(canceled_events);
	events = events.concat(expired_events);
	res.render('home', {events});

}


async function event(req, res){
	const event = await Event.findOne({slug:req.params.slug}).lean();
	const feedback = await Feedback.find({event:event._id}).populate('student').populate('event_manager').populate('volunteer').lean();

	if(req.session.logged){
		const jwtres = await jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
		const role = jwtres.role;
		const _id = jwtres._id;

		// STUDENTS...(PARTICIPATED EVENTS)
		if(role=='student'){
			const participated = await Participant.find({student:_id});
			for(let i=0; i<participated.length; i++){
				if(participated[i].event.toString()==event._id.toString()){
					event.participated = true;
				}
			}
		}

		// VOLUNTEERS... (REQUESTED EVENTS)
		else if(role=='volunteer'){
			const event_member = await Event_Member.find({volunteer:_id});
			for(let i=0; i<event_member.length; i++){
				if(event_member[i].event.toString()==event._id.toString()){
					if(event_member[i].request_status==true)
						event.accepted = true;
					else if(event_member[i].request_status==false)
						event.rejected = true;
					else
						event.pending = true;
				}
			}
		}					

		// EVENT-MANAGERS...(ORGANIZED EVENTS)
		else if(role=='event_manager'){
			// _id IS USER ID
			if(event.event_manager.toString()=== _id.toString()){
				event.my_event = true;
			}
		}					

	}

	// CHECK THE EVENT IS EXPIRED OR NOT?
	var end_date = moment(event.end_date,'DD/MM/YYYY').format('YYYY-MM-DD');
	end_date = new Date(end_date);
	var today = moment().format('YYYY-MM-DD');
	today = new Date(today);
	if(moment(end_date).isBefore(today) && !moment(end_date).isSame(today)){
		event.expire = true;
	} 

	// IS EVENT IS PAID?
	if(event.type=='paid'){
		event.price = true;
	}

	res.render('event',{event, feedback});
}

async function profile(req, res){
	const jwtres = await jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
	if(jwtres){
		const role = jwtres.role;
		const _id = jwtres._id;
		data = {};
		if(role=='student')
			data = await Student.findOne({_id}).lean();
		else if(role=='volunteer')
			data = await Volunteer.findOne({_id}).lean();
		else if(role=='event_manager')
			data = await Event_Manager.findOne({_id}).lean();
		res.render('profile' , {title:'Profile', person:data} );
	}
}

async function participated_events(req, res){
	const jwtres = await jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
	const _id = jwtres._id;
	const role = jwtres.role;
	if(role=='student'){
		const data = await Participant.find({student:_id}).populate('event').lean();
		res.render('participated_events', {title:'Your Events', events:data});
	}
	else{
		res.status(401).json({message:"User Not Authorized"});			
	}
}

async function joined_events(req, res){
	const jwtres = await jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
	const role = jwtres.role;
	const _id = jwtres._id;

	if(role=='volunteer'){
		const data = await Event_Member.find({volunteer:_id}).populate('event').populate('volunteer').lean();
		// CHECK REQUESTED EVENTS...
		for(let i=0; i<data.length; i++){
			if(data[i].request_status==true)
				data[i].accepted = true;
			else if(data[i].request_status==false)
				data[i].rejected = true;
			else
				data[i].pending = true;
		}
		res.render('joined_events', {title:'Your Events', events:data});
	}

}

async function my_events(req, res){
	const jwtres = await jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
	const role = jwtres.role;
	const _id = jwtres._id;

	if(role=='event_manager'){
		const my_events = await Event.find({event_manager:_id}).lean();
		if(my_events){
			// COUNT PARTICIPANTS, VOLUNTEERS, FEEDBACKS...
			for(let i=0; i<my_events.length; i++){
				my_events[i].participants = await Participant.where({event:my_events[i]._id}).countDocuments();
				my_events[i].volunteers = await Event_Member.where({event:my_events[i]._id}).countDocuments();
				my_events[i].feedbacks = await Feedback.where({event:my_events[i]._id}).countDocuments();
			}
			res.render('my_events', {title:'My-Events', events:my_events});
		}
		else{
			res.status(200).json({message:"You have not Events"});
		}
	}
}

async function volunteers(req, res){
	const event = await Event.findOne({slug:req.params.slug});
	const jwtres = await jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
	const role = jwtres.role;

	if(role=='event_manager'){
		const volunteers = await Event_Member.find({event:event._id}).populate('volunteer').lean();
		// CHECK REQUESTED EVENTS...
		for(let i=0; i<volunteers.length; i++){
			volunteers[i].index = i+1;
			if(volunteers[i].request_status==true)
				volunteers[i].accepted = true;
			if(volunteers[i].request_status==false)
				volunteers[i].rejected = true;
			else
				volunteers[i].pending = true;
		}
		res.render('volunteers', {title:'My-Volunteers', volunteers});
	}
}

async function participants(req, res){
	const event = await Event.findOne({slug:req.params.slug});
	const jwtres = await jwt.verify(req.session.logged,process.env.JWT_SECRET_KEY);
	const role = jwtres.role;

	if(role=='event_manager'){
		const participants = await Participant.find({event:event._id}).populate('student').lean();
		// CHECK ALL PARTICIPANTS HAVE CERTIFICATES OR NOT
		var certificates = true;			
		for(let i=0; i<participants.length; i++){
			if(participants[i].certificate!==true)
				certificates = false;
		}
		res.render('participants', {title:'My-Participans', participants, event:event._id, certificates});
	}
}

async function feedbacks(req, res){
	const event = await Event.findOne({slug:req.params.slug});
	const jwtres = await jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
	const role = jwtres.role;

	if(role=='event_manager'){
		const feedbacks = await Feedback.find({event:event._id}).populate('student').populate('volunteer').populate('event_manager').lean();
		res.render('feedbacks', {title:'My-Feedbacks', feedbacks});
	}
}

async function add_event(req, res){
	const jwtres = await jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
	const role = jwtres.role;
	const _id = jwtres._id;

	if(role=='event_manager'){
		const event_manager = await Event_Manager.findOne({_id});
		const event_categories = await Event_Category.find({}).lean();
		person = {	name:event_manager.name, mobile:event_manager.mobile };
		res.render('add_event', {title:'Add-Event',event_categories, person});
	}
}

async function update_event(req, res){
	const event_categories = await Event_Category.find({}).lean();
	const event = await Event.findOne({slug:req.params.slug}).lean();

	// REFORMAT THE DATE AND TIME FOR ASSIGN INTO A HTML
	event.start_time = moment(event.start_time,'hh:mm A').format('HH:mm');
	event.end_time = moment(event.end_time,'hh:mm A').format('HH:mm');
	event.start_date = moment(event.start_date,'DD/MM/YYYY').format('YYYY-MM-DD');
	event.end_date = moment(event.end_date,'DD/MM/YYYY').format('YYYY-MM-DD');

	// CHECK EVENT CATEGORY AND IT'S FOR BY DEFAULT SELECTION...
	for(let i=0; i<event_categories.length; i++){
		if(event.category.toString() === event_categories[i].name.toString()){
			event_categories[i].selected = true;
		}
	}
	// CHECK THE TYPE OF EVENT FREE OR PAID?
	event.type = (event.type=='paid')? true : false;
	res.render('update_event', {title:'Update-Event', event_categories, event});

}

async function regenerate_event(req, res){
	const jwtres = await jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
	const role = jwtres.role;
	const _id = jwtres._id;

	if(role=='event_manager'){
		const event_categories = await Event_Category.find({}).lean();
		const event = await Event.findOne({slug:req.params.slug}).lean();
		const event_manager = await Event_Manager.findOne({_id}).lean();

		// REFORMAT THE DATE AND TIME FOR ASSIGN INTO A HTML
		event.start_time = moment(event.start_time,'hh:mm A').format('HH:mm');
		event.end_time = moment(event.end_time,'hh:mm A').format('HH:mm');
		event.start_date = moment(event.start_date,'DD/MM/YYYY').format('YYYY-MM-DD');
		event.end_date = moment(event.end_date,'DD/MM/YYYY').format('YYYY-MM-DD');
		for(let i=0; i<event_categories.length; i++){
			if(event.category.toString() === event_categories[i].name.toString()){
				event_categories[i].selected = true;
			}
		}
		// CHECK EVENT TYPE
		event.type = (event.type=='paid')? true : false;
		event.person_name = event_manager.name;
		event.person_mobile = event_manager.mobile;
		res.render('regenerate_event', {title:'Regenerate-Event', event_categories, event});			
	}
}

async function nortification(req, res){

	const jwtres = await jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
	const role = jwtres.role;
	const _id = jwtres._id;

	var nortifications;
	if(role=='student'){
		nortifications = await Nortification.find({student:_id}).lean();
	}
	else if(role=='volunteer'){
		nortifications = await Nortification.find({volunteer:_id}).lean();
	}
	else if(role=='event_manager'){
		nortifications = await Nortification.find({event_manager:_id}).lean();
	}
	res.render('nortification', {title:'Nortifications', nortifications});
}

async function other_volunteers(req, res){
	const event = await Event.findOne({slug:req.params.slug});
	const volunteers = await Event_Member.find({request_status:true, event:event._id}).populate('volunteer').select('volunteer').lean();
	res.render('other_volunteers', {title:'Other Volunteers',volunteers});
}

// DOWNLOAD OR PRINT THE CERTIFICATE...
async function certificate(req, res){
	const event = await Event.findOne({slug:req.params.slug});
	const student = req.params.student;
	const data = await Participant.findOne({event:event._id, student}).populate('event').populate('student').lean();
	res.render('certificate', {title:'Certificate', data});		
}

function login(req, res){
	res.render('login', {title:'Login'});
}

function signup(req, res){
	res.render('signup', {title:'Signup'});
}

function forgot_password(req, res){
	res.render('forgot_password' ,{title:'Forgot Password'});
}

function change_password(req, res){
	res.render('change_password' ,{title:'Change Password'});
}

function contact_admin(req, res){
	res.render('contact_admin', {title:'Contact Admin'});
}

function term_condition(req, res){
	res.render('term_condition', {title:'Term & Condition'});
}

function not_found(req, res){
	res.render('404', {title:'404'});
}

module.exports = {
					certificate,
					home, 
					event, 
					login,
					signup,
					forgot_password,
					contact_admin,
					profile,
					term_condition,
					participated_events,
					joined_events,
					my_events,
					participants,
					volunteers,
					add_event,
					update_event,
					feedbacks,
					regenerate_event,
					change_password,
					nortification,
					other_volunteers,
					not_found
				}