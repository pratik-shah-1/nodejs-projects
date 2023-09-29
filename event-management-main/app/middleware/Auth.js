const Student = require('../models/Student.js');
const Event_Manager = require('../models/Event_Manager.js');
const Volunteer = require('../models/Volunteer.js');
const jwt = require('jsonwebtoken');

async function check(req, res, next){

	if(req.session.logged){
		const result = jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
		if(result){
			if((req.url === '/login') || (req.url === '/signup')){
				res.redirect('/');
			}
			next();
		}
	}
	
	else if(req.session.logged == undefined){
		if(req.url === '/event')
			next();
		else if(req.url === '/')
			next();
		else if(req.url === '/login')
			next();
		else if(req.url === '/signup')
			next();
		else
			res.redirect('/login');
	}

}


module.exports = {check}