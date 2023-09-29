const crypto = require('crypto');

async function create_token(req, res, next){
	if(req.method=='GET'){
		req.session._token = await crypto.randomBytes(50).toString('base64');
		res.cookie('_csrf', req.session._token);
		res.locals._token = req.session._token;
	}
	next();		
}

async function check_token(req, res, next){
	if(req.method !== 'GET'){
		// console.log();
		if(req.cookies._csrf!==""){
			next();
		}
		else{
			res.status(428).json({message:"CSRF token is missing!"});			
		}
		// if(req.body._token === req.session._token){
		// 	next();
		// }
		// else if(req.session._token !== req.body._token){
		// 	res.status(400).json({message:"CSRF token is not match!"});		
		// }
		// else{
		// 	res.status(428).json({message:"CSRF token is missing or not match!"});
		// }		
	}
}

module.exports = {create_token, check_token };