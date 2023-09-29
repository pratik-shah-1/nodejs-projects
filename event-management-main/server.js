"use strict";
require('dotenv').config({path:'./app/.env'});
const PORT = process.env.PORT;
const express = require('express');
const app = express();
const session = require('express-session');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const socket = require('socket.io');
// const server = require('http').createServer(app);
// const io = socket(server);

// WEB & API ROUTES...
const webRoutes = require('./app/routes/web.js');
const apiRoutes = require('./app/routes/api.js');
// const Realtime = require(__dirname+'/app/controllers/Realtime.js');

// HANDLEBARS CUSTOM HELPER...
const hbs = exphbs.create({});

hbs.handlebars.registerHelper("index", function(value, options){
    return parseInt(value) + 1;
});

hbs.handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

// SESSION CONFIG...
const sessionOptions = {
  	secret: process.env.SESSION_SECRET_KEY,
  	resave: true,
  	saveUninitialized: true,
  	cookie: { 
	 	secure: false,// IF TRUE THEN CSRF TOKEN ERROR GENEREATE... 
	  	httpOnly: true, 
	  	sameSite: true	  		
	}
};
// DATABASE CONFIG...
const mongooseOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}

mongoose.connect('mongodb://localhost:27017/event',mongooseOptions );

// FIRST SET ALL CONFIG... -----> THEN USE ALL...
app.set('view engine', 'hbs');
app.set('views', './views');
app.engine('hbs', exphbs({defaultLayout:'index', extname:'.hbs'}));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname+'/public'));
app.use(session(sessionOptions));
app.use(apiRoutes);
app.use(webRoutes);

// SOCKET.IO METHOD CALL...
// Realtime(io);
app.listen(PORT,()=>{ console.log(`listening on ${PORT}`) });
// server.listen(PORT,()=>{ console.log(`listening on ${PORT}`) });
