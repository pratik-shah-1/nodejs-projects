const Wishlist = require('../models/Wishlist.js');
const jwt = require('jsonwebtoken');

async function add(req, res){
	const jwtres = await jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
	const role = jwtres.role;		
	const _id = jwtres._id;

	if(role=='student'){
		await Wishlist.create({
			student : _id,
			event : req.body.event
		});
		res.status(201).json({message:"Added to Wishlist"});			
	} 

	else if(role=='volunteer'){
		await Wishlist.create({
			volunteer : _id,
			event : req.body.event
		});
		res.status(201).json({message:"Added to Wishlist"});			
	}

	else{
		res.status(401).json({message:"User not authorized"});			
	}

}

async function remove(req, res){
	const jwtres = await jwt.verify(req.session.logged, process.env.JWT_SECRET_KEY);
	const role = jwtres.role;
	const _id = jwtres._id;

	if(role=='student'){
		await Wishlist.deleteOne({student:_id, event:req.params.event});
		res.status(200).json({message:"Removed from Wishlist"});
	}
	else if(role=='volunteer'){
		await Wishlist.deleteOne({volunteer:_id, event:req.params.event});
		res.status(200).json({message:"Removed from Wishlist"});
	}
	else{
		res.status(401).json({message:"User not authorized"});
	}
}

module.exports = {add, remove};
