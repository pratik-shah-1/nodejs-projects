// ----------MODULES----------
import { Router } from "express";

// ----------MIDDLEWARE----------
import VerifyToken from '../app/middleware/auth.js';

// ----------CONTROLLERS----------
import IntroductionController from "../app/controllers/Introduction.js";
import FooterController from "../app/controllers/Footer.js";
import ResumeController from "../app/controllers/Resume.js";
// import portfolio from "../app/controllers/portfolio.js";
// import socialMediaLink from "../app/controllers/socialMediaLink.js";

const Route = Router();

// -----ADD-----
Route.post('/introduction', VerifyToken, IntroductionController);
Route.post('/footer', VerifyToken, FooterController);
Route.post('/resume', VerifyToken, ResumeController);

// Route.post('/portfolio/top', VerifyToken);
// Route.post('/portfolio', VerifyToken);
// Route.post('/social-media-links', VerifyToken);

// -----UPDATE-----
// Route.put('/portfolio/top/:id', getNewToken);
// Route.put('/portfolio/:id', getNewToken);
// Route.put('/social-media-links/:id', );

// -----DELETE-----
// Route.delete('/portfolio/top/:id', getNewToken);
// Route.delete('/portfolio/:id', getNewToken);
// Route.delete('/social-media-links/:id', );

export default Route;