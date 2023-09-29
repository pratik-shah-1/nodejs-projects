const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const Socket_Id = require('../models/Socket_Id.js');

function Realtime(io){

	io.on('connection', async(socket)=>{
		const jwt_token = cookie.parse(socket.handshake.headers.cookie).user;
		if(jwt_token){
			const jwtres = await jwt.verify(jwt_token, process.env.JWT_SECRET_KEY);
			const user_id = jwtres._id;
			const role = jwtres.role;

			if(await Socket_Id.exists({user_id})){
				await Socket_Id.findOne({user_id}).updateOne({socket_id:socket.id});			
				// console.log('socket_id updated');
			}
			else{				
				await Socket_Id.create({ user_id, role, socket_id:socket.id });	
				// console.log('socket_id created');
			}
		}

		// socket.on('winner', async (arrObj)=>{
		// 	// console.log(arrObj);
		// 	const result = await Socket_Id.findOne({user_id:arrObj[0].student});
		// 	socket.broadcast.to(result.socket_id).emit('winner', arrObj);
		// });

		// socket.on('looser', async (arrObj)=>{
		// 	// console.log(arrObj);
		// 	const result = await Socket_Id.findOne({user_id:arrObj[0].student});
		// 	socket.broadcast.to(result.socket_id).emit('looser', arrObj);
		// });

		// socket.on('certificate', async (arrObj)=>{
		// 	// console.log(arrObj);
		// 	const result = await Socket_Id.findOne({user_id:arrObj[0].student});
		// 	socket.broadcast.to(result.socket_id).emit('certificate', arrObj);
		// });

		// socket.on('no_certificate', async (arrObj)=>{
		// 	// console.log(arrObj);
		// 	const result = await Socket_Id.findOne({user_id:arrObj[0].student});
		// 	socket.broadcast.to(result.socket_id).emit('no_certificate', arrObj);
		// });

		socket.on('certificates', (arrObj)=>{
			socket.broadcast.emit('certificates', arrObj);
		});

		socket.on('no_certificates', (arrObj)=>{
			socket.broadcast.emit('no_certificate', arrObj);
		});

	});

}

module.exports = Realtime;