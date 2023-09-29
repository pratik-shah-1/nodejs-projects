const Joi = require('joi');

function comman(res, result, next){
	if(result.error){
		// REMOVE SINGLE OR DOUBLE QUOTES...
		var error_msg = result.error.details[0].message.replace(/['"]+/g, '');
		// REMOVE UNDERSCORE FROM STRING...
		error_msg = error_msg.replace('_',' ');
		res.status(400).json({ message : error_msg });
	}
	else{
		next();
	}
}

async function signup (req, res, next){
	const signupObj = Joi.object({
		_token: Joi.string().required(),
		role: Joi.string().required(),
		name: Joi.string().required(),
		email: Joi.string().email().required().label('Email Address'),
		mobile: Joi.number().min(6000000000).message('mobile number must be equal to 10 digits').max(9999999999).message('mobile number must be equal to 10 digits').optional(),
		password: Joi.string().min(6).required(),
		confirm_password: Joi.ref('password'),
		tc : Joi.string().optional() 
	});
	const result = await signupObj.validate(req.body);
	comman(res, result, next);
}

async function profile( req, res, next){
	const profileObj = Joi.object({
		_token: Joi.string().required(),
		name: Joi.string().required(),
		email: Joi.string().email().required().label('Email Address'),
		mobile: Joi.number().min(6000000000).message('mobile number must be equal to 10 digits').max(9999999999).message('mobile number must be equal to 10 digits').optional(),
		password: Joi.string().min(6).required()
	});
	const result = await profileObj.validate(req.body);
	comman(res, result, next);		
}

async function change_password( req, res, next){
	const passwordObj = Joi.object({
		_token: Joi.string().required(),
		old_password: Joi.string().min(6).required(),
		new_password: Joi.string().min(6).required(),
		confirm_password: Joi.ref('new_password')
	});
	const result = await passwordObj.validate(req.body);
	comman(res, result, next);		
}

async function forgot_password( req, res, next){
	const forgotObj = Joi.object({
		_token : Joi.string().required(),
		role: Joi.string().required(),
		email : Joi.string().email().required().label('Email Address')
	});
	const result = await forgotObj.validate(req.body);
	comman(res, result, next);		
}

async function set_new_password( req, res, next){
	const set_new_passwordObj = Joi.object({
		_token : Joi.string().required(),
		email : Joi.string().email().required().label('Email Address'),
		role : Joi.string().required(),
		password: Joi.string().min(6).required(),
		confirm_password: Joi.ref('password'),
	});
	const result = await set_new_passwordObj.validate(req.body);
	comman(res, result, next);		
}

async function login(req, res, next){
	const loginObj = Joi.object({
		_token: Joi.string().required(),
		role: Joi.string().required(),
		remember_me: Joi.string().optional(),
		email: Joi.string().email().required().label('Email Address'),
		password: Joi.string().min(6).required(),
	});
	const result = await loginObj.validate(req.body);
	comman(res, result, next);
}

async function admin_login(req, res, next){
	const loginObj = Joi.object({
		_token: Joi.string().required(),
		username: Joi.string().required().label('Username'),
		password: Joi.string().required(),
	});
	const result = await loginObj.validate(req.body);
	comman(res, result, next);
}

async function event(req, res, next){
	const eventObj = Joi.object({
		_token: Joi.string().required(),
		event: Joi.string().optional(),
		name: Joi.string().required(),
		category: Joi.string().required(),
		details: Joi.string().required(),
		image: Joi.string().optional(),
		type: Joi.string().required(),
		amount: Joi.number().integer(),
		certificate: Joi.string().required(),
		winner: Joi.string().required(),
		start_time: Joi.string().required(),
		end_time: Joi.string().required(),
		start_date: Joi.date().required(),
		end_date: Joi.date().required(),
		capacity: Joi.string().required(),
		location: Joi.string().required(),
		person_name: Joi.string().required(),
		person_mobile: Joi.number().min(6000000000).message('mobile number must be equal to 10 digits').max(9999999999).message('mobile number must be equal to 10 digits').optional(),
	})		
	const result = await eventObj.validate(req.body);
	comman(res, result, next);
}

async function feedback(req, res, next){
	const feedbackObj = Joi.object({
		_token :Joi.string().required(),
		event: Joi.string().required(),
		feedback: Joi.string().required()
	});
	const result = feedbackObj.validate(req.body);
	comman(res, result, next);
}

module.exports = {
				signup, 
				login, 
				admin_login,
				profile,
				change_password,
				forgot_password,
				set_new_password,
				event, 
				feedback
			};
