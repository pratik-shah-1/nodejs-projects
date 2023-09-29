const jwt = require('jsonwebtoken');
const path = require('path');
const express = require('express');
const Route = express.Router();

// MODELS
const Student = require('../models/Student.js');
const Volunteer = require('../models/Volunteer.js');
const Event_Manager = require('../models/Event_Manager.js');
const Nortification = require('../models/Nortification.js');

// CONTROLLERS
const Page = require('../controllers/pages/Pages.js');
const Admin_Page = require('../controllers/pages/Admin_Pages.js');

// MIDDLEWARE
const Auth = require('../middleware/Auth.js');
const Admin_Auth = require('../middleware/Admin_Auth.js');
const CSRF = require('../middleware/CSRF.js');

 // res.locals.variable_name IT'S ONLY USE WITH MIDDLEWARE

Route.use(async(req, res, next)=>{
	// CHECK WHO IS LOGGED?
	if(req.session.logged!==undefined){
		const result = await jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
		const _id = result._id;
		var nortifications;

		if(await Student.exists({_id})){
			res.locals.student = true;
			nortifications = await Nortification.find({student:_id}).countDocuments();
		}
		else if(await Volunteer.exists({_id})){
			res.locals.volunteer = true;
			nortifications = await Nortification.find({volunteer:_id}).countDocuments();
		}
		else if(await Event_Manager.exists({_id})){
			res.locals.event_manager = true;
			nortifications = await Nortification.find({event_manager:_id}).countDocuments();
		}
		res.locals.logged = true;
		// HERE WE USE NORTIFICATON_COUNTS INSTED OF NORTIFICATIONS BECAUSE OF NAME CONFLIC ON NORTIFICATION.VIEW
		res.locals.nortification_counts = nortifications;
		res.locals.logged_person_name = result.name;
	}	
	next();
});


// IF WE PUT CSRF AS GLOBAL MIDDLEWARE THEN IT'S CALL EVERY TIME ANY DURING RENDER ON PAGE CSRF TOKEN CHANGED

// RENDER PAGES...

Route.get('/', CSRF.create_token, Page.home);
Route.get('/event/:slug', CSRF.create_token, Page.event);
Route.get('/login', Auth.check, CSRF.create_token, Page.login);
Route.get('/signup', Auth.check, CSRF.create_token, Page.signup);
Route.get('/change_password', Auth.check, CSRF.create_token, Page.change_password);
Route.get('/forgot_password', CSRF.create_token, Page.forgot_password);
Route.get('/profile', Auth.check, CSRF.create_token, Page.profile);
Route.get('/participated_events', Auth.check, Page.participated_events);
Route.get('/joined_events', Auth.check, Page.joined_events);
Route.get('/add_event', Auth.check, CSRF.create_token, Page.add_event);
Route.get('/update_event/:slug', Auth.check, CSRF.create_token, Page.update_event);
Route.get('/regenerate_event/:slug', Auth.check, CSRF.create_token, Page.regenerate_event);
Route.get('/my_events', Auth.check, Page.my_events);
Route.get('/my_events/:slug/volunteers', Auth.check, CSRF.create_token, Page.volunteers);
Route.get('/my_events/:slug/participants', Auth.check, CSRF.create_token, Page.participants);
Route.get('/my_events/:slug/feedbacks', Auth.check, Page.feedbacks);
Route.get('/contact_admin', CSRF.create_token, Page.contact_admin);
Route.get('/term_condition', Page.term_condition);
Route.get('/certificate/:slug/:student', Auth.check, Page.certificate);
Route.get('/nortification', Auth.check, CSRF.create_token, Page.nortification);
Route.get('/other_volunteers/:slug', Auth.check, Page.other_volunteers);

// ADMIN SECTION PAGES RENDER....			
Route.get('/admin', Admin_Auth.check, CSRF.create_token, Admin_Page.admin);
Route.get('/admin/event/:id', Admin_Auth.check, Admin_Page.admin_event);
Route.get('/admin/events', Admin_Auth.check, CSRF.create_token, Admin_Page.admin_events);
Route.get('/admin/participants', Admin_Auth.check, CSRF.create_token, Admin_Page.admin_participants);
Route.get('/admin/volunteers', Admin_Auth.check, CSRF.create_token, Admin_Page.admin_volunteers);
Route.get('/admin/event_managers', Admin_Auth.check, CSRF.create_token, Admin_Page.admin_event_managers);
Route.get('/admin/nortifications', Admin_Auth.check, CSRF.create_token, Admin_Page.admin_nortifications);
Route.get('/admin/event_category', Admin_Auth.check, CSRF.create_token, Admin_Page.event_category);

// AFTER ADDING 404 PAGE (WITH ALSO USE TURBO LINKS) CSRF TOKEN ERROR
Route.get('/*', Page.not_found);
module.exports = Route;