const Feedback = require('../../models/Feedback.js');
const Event = require('../../models/Event.js');
const Wishlist = require('../../models/Wishlist.js');
const Student = require('../../models/Student.js');
const Participant = require('../../models/Participant.js');
const Volunteer = require('../../models/Volunteer.js');
const Event_Member = require('../../models/Event_Member.js');
const Event_Manager = require('../../models/Event_Manager.js');
const Event_Category = require('../../models/Event_Category.js');
const Contact_Admin = require('../../models/Contact_Admin.js');
const Nortification = require('../../models/Nortification.js');

// BY DEFAULT ADMIN HAVE LOGIN PAGE...
function admin(req, res){
	res.render('admin/login', {title:'Home', layout:'admin'});
}

async function admin_nortifications(req, res){
	nortifications = await Contact_Admin.find({}).lean();
	res.render('admin/nortifications', {title:'Nortifications', layout:'admin', nortifications});
}

async function admin_events(req, res){
	const data = await Event.find({}).lean();
	for(let i=0;i<data.length; i++){
		data[i].participants = await Participant.find({event:data[i]._id}).countDocuments();
		data[i].volunteers = await Event_Member.find({event:data[i]._id}).countDocuments();
	}
	res.render('admin/events', {title:'Events', layout:'admin', events:data});
}

async function event_category(req, res){
	const data = await Event_Category.find({}).lean();
	res.render('admin/event_category', {title:'Event-Category', layout:'admin', event_category:data});
}

async function admin_event(req, res){
	const data = await Event.findOne({_id:req.params.id}).lean();
	const feedback = await Feedback.find({event:req.params.id}).lean();
	res.render('admin/event', {title:'Event', layout:'admin', event:data, feedback});
}

async function admin_participants(req, res){
	const data = await Student.find({}).lean();
	for(let i=0;i<data.length; i++){
		data[i].participated_events = await Participant.find({student:data[i]._id}).countDocuments();
	}
	res.render('admin/participants', {title:'Participants', layout:'admin', participants:data});
}

async function admin_volunteers(req, res){
	const data = await Volunteer.find({}).lean();
	for(let i=0;i<data.length; i++){
		data[i].joined_events = await Event_Member.find({volunteer:data[i]._id}).countDocuments();
		data[i].membered_events = await Event_Member.find({volunteer:data[i]._id, request_status:true}).countDocuments();
		data[i].rejected_events = await Event_Member.find({volunteer:data[i]._id, request_status:false}).countDocuments();
	}
	res.render('admin/volunteers', {title:'Volunteers', layout:'admin', volunteers:data});
}

async function admin_event_managers(req, res){
	const data = await Event_Manager.find({}).lean();
	for(let i=0;i<data.length; i++){
		data[i].events = await Event.find({event_manager:data[i]._id}).countDocuments();
	}
	res.render('admin/event_managers', {title:'Event-Managers', layout:'admin', event_managers:data});
}


module.exports = {
					admin,// BY DEFAULT LOGIN PAGE...	
					admin_events,
					admin_event,
					admin_volunteers,
					admin_participants,
					admin_event_managers,
					admin_nortifications,
					event_category
				}