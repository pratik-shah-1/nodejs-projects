const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const Event_Manager = require('../models/Event_Manager.js');
const Volunteer = require('../models/Volunteer.js');
const Student = require('../models/Student.js');

async function generate_and_send(email, req, res){

  	function GenerateOTP(min, max) {
	    min = Math.ceil(min);
	    max = Math.floor(max);
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	const otp_number = GenerateOTP(1000,9999);
	req.session.otp = await bcrypt.hash(otp_number+process.env.OTP_SECRET_KEY, 10);

  	try{
  		console.log(otp_number);
	  // 	let transporter = nodemailer.createTransport({
		 //    host: "smtp.gmail.com",
		 //    port: 587,
		 //    secure: false,
		 //    auth: {
		 //      	user: process.env.EMAIL, 
		 //      	pass: process.env.PSWD,
		 //    },
	  // 	});
	  // 	let info = await transporter.sendMail({
		 //    from: process.env.EMAIL, 
		 //    to: email,
		 //    subject: "Forgot Password",
		 //    html: `
		 //    	<b>Your OTP FROM Event Festival don't share with anyone</b>
		 //    	<br>
		 //    	<br>
		 //    	OTP = <b>${otp_number}</b>
		 //    	`,
		 // });
		res.status(201).json({message:'OTP Sent Successfully...'});
  	}
  	catch(err){
  		console.log(err);
  		res.status(400).json({message:'Please try again'});
  	}
	

}

async function send_otp(req, res){
	const role = req.body.role;
	const email = req.body.email;

	if(role!=="" && email!==""){
		if(role=='student'){
			if(await Student.exists({email}))
				generate_and_send(email, req, res);
			else
				res.status(401).json({message:'Email Address not in Database'});
		}
		else if(role=='volunteer'){
			if(await Volunteer.exists({email}))
				generate_and_send(email, req, res);
			else
				res.status(401).json({message:'Email Address not in Database'});
		}
		else if(role=='event_manager'){
			if(await Event_Manager.exists({email}))
				generate_and_send(email, req, res);
			else
				res.status(401).json({message:'Email Address not in Database'});
		}
	}
	else{
		res.status(400).json({message:"Something Went Wrong"});
	}

}


async function check_otp(req, res){
	if(await bcrypt.compare(req.body.otp+process.env.OTP_SECRET_KEY, req.session.otp)){
		req.session.otp = null;
		res.status(200).json({message:'OTP Matched'});
	}
	else{
		res.status(400).json({message:'You Enter Wrong OTP'});
	}
}


async function set_new_password(req, res){
	const role = req.body.role;
	const email = req.body.email;
	var password = req.body.password;
	const confirm_password = req.body.confirm_password;

	if(password==confirm_password){
		password = await bcrypt.hash(password, 10);
		if(role=='student'){
			await Student.findOne({email}).updateOne({password});
			res.status(200).json({message:'Password Set Successfully...'});
		}
		else if(role=='volunteer'){
			await Volunteer.findOne({email}).updateOne({password});
			res.status(200).json({message:'Password Set Successfully...'});
		}
		else if(role=='event_manager'){
			await Event_Manager.findOne({email}).updateOne({password});
			res.status(200).json({message:'Password Set Successfully...'});
		}
	}	
	else{
		res.status(400).json({message:"Password not match with Confirm password"});
	}

}

module.exports = {
					send_otp,
					check_otp,
					set_new_password
				}