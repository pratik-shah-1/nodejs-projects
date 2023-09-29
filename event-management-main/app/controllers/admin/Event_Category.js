const Event_Category = require('../../models/Event_Category.js');

async function add(req, res){
	const event_category = await Event_Category.create({name:req.body.category});
	res.status(200).json({message:"Event Category added successfully"});
}

async function remove(req, res){
	const event_category = await Event_Category.deleteOne({_id:req.params.id});
	res.status(200).json({message:"Event Category deleted successfully"});
}


module.exports = {add, remove};