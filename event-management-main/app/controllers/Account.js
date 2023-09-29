const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Student = require('../models/Student.js');
const Volunteer = require('../models/Volunteer.js');
const Event_Manager = require('../models/Event_Manager.js');

async function signup(req, res){
	const role = req.body.role;
	const name = req.body.name;
	const email = req.body.email;
	const mobile = req.body.mobile;
	var password = req.body.password;
	const confirm_password = req.body.confirm_password;
	password = await bcrypt.hash(password, 10);
	const dataObj = {name, email, mobile, password};

	// FOR STUDENTS...
	if(role=='student'){
		if(!await Student.exists({email}) && !await Student.exists({mobile})){
			try{
				await Student.create(dataObj);
				res.status(201).json({message:"Account Created Successfully..."});					
			}
			catch(e){
				res.status(400).json({message:'Can\'t signup '});
			}
		}
		else{
			res.status(409).json({message:"Email Address or Mobile already exists"});
		}
	}

	// FOR VOLUNTEERS...
	else if(role=='volunteer'){
		if(!await Volunteer.findOne({email}) && !await Volunteer.findOne({mobile})){
			try{
				await Volunteer.create(dataObj);				
				res.status(201).json({message:"Account Created Successfully..."});	
			}
			catch(e){
				res.status(400).json({message:'Can\'t signup '});
			}
		}
		else{
			res.status(409).json({message:"Email Address or Mobile already exists"});
		}
	}

	//FOR EVENT MANAGERS...
	else if(role=='event_manager'){
		if(!await Event_Manager.exists({email}) && !await Event_Manager.exists({mobile})){
			try{
				await Event_Manager.create(dataObj);
				res.status(201).json({message:"Account Created Successfully..."});
			}
			catch(e){
				res.status(400).json({message:'Can\'t signup'});				
			}
		}
		else{
			res.status(409).json({message:"Email Address or Mobile already exists"});
		}
	}

	// NOT MATCHED..
	else{
		res.status(400).json({message:"Unauthorized person"});
	}

}

async function profile(req, res){
	var name = req.body.name;
	var email = req.body.email; // READONLY FILED HAI...
	var mobile = req.body.mobile;
	var password = req.body.password;
	const dataObj = {name, mobile};
	const jwtres = await jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
	const role = jwtres.role; 

	// FOR STUDENTS...		
	if(role=='student'){
		const student = await Student.findOne({email});
		if(await bcrypt.compare(password, student.password)){
			if(await Student.exists({mobile})){
				const result = await Student.findOne({mobile});				
				if(student.email==result.email){				
					try{
						await Student.findOne({email}).updateOne(dataObj);
						res.status(200).json({message:"Profile updated successfully"});
					}
					catch(e){
						res.status(400).json({message:'Something Went Wrong'});
					}
				}
				else{
					res.status(409).json({message:'Mobile Already exists in Databases...'});
				}
			}
			else{
				try{
					await Student.findOne({email}).updateOne(dataObj);
					res.status(200).json({message:"Profile updated successfully"});
				}
				catch(e){
					res.status(400).json({message:'Something Went Wrong'});
				}				
			}
		}
		else{
			res.status(400).json({message:"You enter wrong password"});
		}
	}

	// FOR VOLUNTEERS...
	else if(role=='volunteer'){
		const volunteer = await Volunteer.findOne({email});
		if(await bcrypt.compare(password, volunteer.password)){
			if(await Volunteer.exists({mobile})){
				const result = await Volunteer.findOne({mobile});
				if(volunteer.email==result.email){
					try{
						await Volunteer.findOne({email}).updateOne(dataObj);
						res.status(200).json({message:"Profile updated successfully"});
					}
					catch(e){
						res.status(400).json({message:'Something Went Wrong'});					
					}				
				}
				else{
					res.status(409).json({message:'Mobile Already exists in Databases...'});
				}
			}
			else{
				try{
					await Volunteer.findOne({email}).updateOne(dataObj);
					res.status(200).json({message:"Profile updated successfully"});
				}
				catch(e){
					res.status(400).json({message:'Something Went Wrong'});					
				}				
			}
		}
		else{
			res.status(400).json({message:"You enter wrong password"});
		}
	}

	// FOR EVENT-MANAGERS...
	else if(role=='event_manager'){
		const event_manager = await Event_Manager.findOne({email});
		if(await bcrypt.compare(password, event_manager.password)){
			if(await Event_Manager.exists({mobile})){
				const result = await Event_Manager.findOne({mobile});
				if(result.email==event_manager.email){
					try{
						await Event_Manager.findOne({email}).updateOne(dataObj);	
						res.status(200).json({message:"Profile updated successfully"});
					}
					catch(e){
						res.status(400).json({message:'Something Went Wrong'});										
					}									
				}
				else{
					res.status(409).json({message:'Mobile Already exists in Databases...'});
				}
			}
			else{
				try{
					await Event_Manager.findOne({email}).updateOne(dataObj);	
					res.status(200).json({message:"Profile updated successfully"});
				}
				catch(e){
					res.status(400).json({message:'Something Went Wrong'});										
				}				
			}
		}
		else{
			res.status(400).json({message:"You enter wrong password"});
		}
	}
	
	// NOT MATCHED...
	else{
		res.status(401).json({message:"Unauthorized person"});
	}

}

async function change_password(req, res){
	var old_password = req.body.old_password
	var new_password = req.body.new_password;
	var confirm_password = req.body.confirm_password;
	var jwtres = await jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
	var role = jwtres.role;
	var _id = jwtres._id;	

	// FOR STUDENTS...
	if(role=='student'){
		const student = await Student.findOne({_id});
		if(await bcrypt.compare(old_password, student.password)){
			const password = await bcrypt.hash(new_password, 10);
			try{
				await Student.findOne({_id}).updateOne({password});
				res.status(200).json({message:'Password Change Successfully'});
			}
			catch(e){
				res.status(400).json({message:'Something went wrong'});
			}
		}	
		else{
			res.status(400).json({message:'Old password is wrong'});
		}
	}

	// FOR VOLUNTEERS...
	else if(role=='volunteer'){
		const volunteer = await Volunteer.findOne({_id});
		if(await bcrypt.compare(old_password, volunteer.password)){
			const password = await bcrypt.hash(new_password, 10);
			try{
				await Volunteer.findOne({_id}).updateOne({password});
				res.status(200).json({message:'Password Change Successfully'});
			}
			catch(e){
				res.status(400).json({message:'Something went wrong'});
			}
		}	
		else{
			res.status(400).json({message:'Old password is wrong'});
		}
	}

	// FOR EVENT-MANAGERS...
	else if(role=='event_manager'){
		const event_manager = await Event_Manager.findOne({_id});
		if(await bcrypt.compare(old_password, event_manager.password)){
			const password = await bcrypt.hash(new_password, 10);
			try{
				await Event_Manager.findOne({_id}).updateOne({password});
				res.status(200).json({message:'Password Change Successfully'});
			}
			catch(e){
				res.status(400).json({message:'Something went wrong'});
			}
		}	
		else{
			res.status(400).json({message:'Old password is wrong'});
		}
	}

}

async function login(req, res){
	const role = req.body.role;
	const email = req.body.email;
	const password = req.body.password;

	// STUDENT...
	if(role=='student'){
		if(await Student.exists({email})){
			const student = await Student.findOne({email});
			if(await bcrypt.compare(password, student.password)){
				if(student.block!==true){
					req.session.logged = await jwt.sign({_id:student._id, name:student.name, role:'student'}, process.env.JWT_SECRET_KEY);
					res.cookie('user',req.session.logged);
					if(req.body.remember_me=='true'){
						req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 15;
					}
					res.status(200).send({message:"Login successfully"});
				}
				else{
					res.status(400).send({message:"Your Account is Blocked by Admin"});
				}
			}
			else{
				res.status(400).json({message:"Password is incorrect!"});
			}
		}
		else{
			res.status(400).json({message:"Email Address not Exists!"});
		}
	}

	// EVENT MANAGER
	else if(role=='event_manager'){
		if(await Event_Manager.exists({email})){
			const event_manager = await Event_Manager.findOne({email});
			if(await bcrypt.compare(password, event_manager.password)){
				if(event_manager.block!==true){
					req.session.logged = await jwt.sign({_id:event_manager._id, name:event_manager.name, role:'event_manager'}, process.env.JWT_SECRET_KEY);
					res.cookie('user',req.session.logged);
					if(req.body.remember_me=='true'){
						req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 15;
					}
					res.status(200).json({message:"Login successfully"});
				}
				else{
					res.status(400).send({message:"Your Account is Blocked by Admin"});
				}
			}
			else{
				res.status(400).json({message:"Password is incorrect!"});
			}
		}
		else{
			res.status(400).json({message:"Email Address not Exists!"});
		}
	}

	// VOLUNTEERS...	
	else if(role=='volunteer'){
		if(await Volunteer.exists({email})){
			const volunteer = await Volunteer.findOne({email});
			if(await bcrypt.compare(password, volunteer.password)){
				if(volunteer.block!==true){
					req.session.logged = await jwt.sign({_id:volunteer._id, name:volunteer.name, role:'volunteer'}, process.env.JWT_SECRET_KEY);
					res.cookie('user',req.session.logged);
					if(req.body.remember_me=='true'){
						req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 15;
					}
					res.status(200).json({message:"Login successfully"});
				}
				else{
					res.status(400).send({message:"Your Account is Blocked by Admin"});
				}
			}
			else{
				res.status(400).json({message:"Password is incorrect!"});
			}
		}
		else{
			res.status(400).json({message:"Email Address not Exists!"});
		}
	}
	else{
		res.status(400).json({message:"Unauthorized person"});
	}

}

function logout(req, res){

	if(req.session.logged !== undefined){
		req.session.logged = undefined;
		res.redirect('/login');
	}
	else{
		res.redirect('/');
	}

}

module.exports = {
					signup, 
				 	login, 
					logout, 
					profile, 
					change_password
				};