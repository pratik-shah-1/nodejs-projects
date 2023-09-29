import { Router } from "express";
import { Login, 
        ForgotPassword, 
        VerifyOTP, 
        SetNewPassword, 
        ChangePassword, 
        GetNewToken } from '../app/controllers/Account.js';
import VerifyToken from '../app/middleware/Auth.js';

const Route = Router();
Route.get('/get-new-token', GetNewToken);
Route.post('/login', Login);
Route.post('/forgot-password', ForgotPassword);
Route.post('/verify-otp', VerifyOTP);
Route.put('/set-new-password', VerifyToken, SetNewPassword);
Route.put('/change-password', VerifyToken, ChangePassword);

export default Route;