import cloudinary from 'cloudinary';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path:'./config/.env'});

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;

const connectCloud = ()=>{
	cloudinary.config({ 
	    cloud_name: CLOUD_NAME, 
	    api_key: CLOUD_API_KEY,
	    api_secret: CLOUD_API_SECRET,
	    secure: true,
	});	
}

const connectDB = ()=>{
	mongoose.connect(DB_URL);
}

export {
		PORT, 
		connectCloud,
		connectDB
	};
