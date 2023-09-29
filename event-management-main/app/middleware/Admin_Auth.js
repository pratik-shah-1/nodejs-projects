const jwt = require('jsonwebtoken');
const Contact_Admin = require('../models/Contact_Admin.js');

async function check (req, res, next){
	if(req.session.admin){
		const result = await jwt.verify(req.session.admin, process.env.JWT_SECRET_KEY);
		if(result){
			if(req.url=='/admin')
				res.redirect('/admin/events');
			else{
				res.locals.admin = true;
				res.locals.admin_nortification_counts = await Contact_Admin.find({}).countDocuments();
				next();
			}
		}
	}
	else if(req.session.admin==undefined){
		if(req.url=='/admin')
			next();
		else
			res.redirect('/admin');
	}
}


module.exports = {check}