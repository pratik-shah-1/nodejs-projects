// ----------MODULES----------
import bcrypt from 'bcrypt';
import moment from 'moment';

// ----------MODELS----------
import Admin from '../models/Admin.js';
import OTP from '../models/OTP.js';

// ----------SERVICES----------
import GenerateTokens from '../services/GenerateTokens.js';
import CreateHash from '../services/CreateHash.js';
import SendMail from '../services/SendMail.js';

// ----------LOGIN----------
const Login = async(req, res)=>{
 
    const email    = req.body.email;
    const password = req.body.password;

    try{   
        const result = await Admin.findOne({email});
        if(result){
            if(await bcrypt.compare(password, result.password)){
                let _id = result._id.toString();
                const {accessToken, refreshToken} = GenerateTokens({_id, email});
                await Admin.findOne({email}).updateOne({token:refreshToken});
                res.status(200).json({accessToken, refreshToken});
            }
            else{
                res.status(401).json({message:'User not Authenticated!',});
            }    
        }
        else{
            res.status(404).json({message:'Not Exists in Database!',});
        }
    }
    catch(e){
        res.status(500).json({message:'Internal Server Error!', errors:e});
    }

    // ----------SIGNUP SCRIPTS----------
    // const hash = await CreateHash(password);    
    // if(await Admin.create({email, password:hash})){
    //     res.status(200).json({message:'Account Created Successfully.'});
    // }
    // else{
    //     res.status(500).json({message:'Internal Server Error!'});
    // }

}

// ----------CHANGE-PASSWORD----------
const ChangePassword = async(req, res)=>{

    const email           = req.body.email;
    const oldPassword     = req.body.oldPassword;
    const newPassword     = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    try{
        const result = await Admin.findOne({email});
        if(result){
            if(await bcrypt.compare(oldPassword, result.password)){
                if(newPassword===confirmPassword){
                    const password = await CreateHash(newPassword);
                    await Admin.findOne({email}).updateOne({password});
                    let date = moment().format('DD/MM/YYYY hh:mm A');
                    await SendMail(`Your Password was Changed at ${date}`);
                    res.status(200).json({message:'Password Changed Successfully.'});    
                }
                else{
                    res.status(401).json({message:'New-Password & Confirm-Password Not Matched!'});    
                }
            }
            else{
                res.status(401).json({message:'User Not Authenticated!',});
            }    
        }
        else{
            res.status(404).json({message:'Not Exists in Database!',});
        }
    }
    catch(e){
        res.status(500).json({message:'Internal Server Error!', errors:e});
    }

}

// ----------FORGOT-PASSWORD----------
const ForgotPassword = async(req, res)=>{

    const email = req.body.email;

    try{
        if(await Admin.findOne({email})){
            // GENERATE OTP
            const otp = Math.floor((Math.random() * 9999) + 1000);
            // IF ALREADY EXISTS IN OTP TABLE THEN DELETE AND NEW OTP PASS
            if(await OTP.findOne({email})){
                await OTP.findOne({email}).deleteOne();
            }
            await OTP.create({email, otp});
            await SendMail(`You one time OTP = ${otp}, don't share with anyone!`);
            res.status(200).json({message:'OTP Sent on your Email Address'});
        }
        else{
            res.status(404).json({message:'Not Exists in Database!'});
        }
    }
    catch(e){
        console.log(e);
        res.status(500).json({message:'Internal Server Error',errors:e});
    }


}

// ----------VERIFY-OTP----------
const VerifyOTP = async(req, res)=>{

    const email = req.body.email;
    const otp = req.body.otp;

    try{
        const result = await OTP.findOne({email});
        if(result){
            if(result.otp==otp){
                if(await OTP.findOne({email}).deleteOne()){
                    const { accessToken } = GenerateTokens({otp, email});
                    res.status(200).json({accessToken, message:'OTP Verification Successfully.'});
                }
            }
            else{
                res.status(401).json({message:'OTP Verification Failed!'});
            }
        }
        else{
            res.status(404).json({message:'Email & OTP Not Exists in Database!'});
        }
    }
    catch(e){
        res.status(500).json({message:'Internal Server Error', errors:e});
    }

}

// ----------SET-NEW-PASSWORD----------
const SetNewPassword = async(req, res)=>{

    const email           = req.body.email;
    const newPassword     = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    try{
        if(await Admin.findOne({email})){
            if(newPassword==confirmPassword){
                const password = await CreateHash(newPassword);
                await Admin.findOne({email}).updateOne({password});
                let date = moment().format('DD/MM/YYYY hh:mm A');
                await SendMail(`Your Password was Changed at ${date}`);
                res.status(200).json({message:'Password Changed Successfully.'});    
            }
            else{
                res.status(401).json({message:'New-Password & Confirm-Password Not Matched!'});    
            }
        }
        else{
            res.status(404).json({message:'Not Exists in Database!'});    
        }
    }
    catch(e){
        res.status(500).json({message:'Internal Server Error!', errors:e});
    }

}

// ----------GET-NEW-TOKEN----------
const GetNewToken = async(req, res)=>{

    try{
        const headerToken = req.headers.authorization.split(' ')[1];
        const result = await Admin.findOne({token:headerToken});
        if(result){
            const email = result.email;
            const _id = result._id.toString();
            const { accessToken, refreshToken } = GenerateTokens({_id, email});
            await Admin.findOne({email}).updateOne({token:refreshToken});
            res.status(200).json({accessToken, refreshToken});
        }
        else{
            res.status(401).json({message:'Not a valid Token'});
        }
    }
    catch(e){
        res.status(500).json({message:'Internal Server Errors', errors:e});
    }

}

export {
    Login, 
    ChangePassword, 
    ForgotPassword, 
    VerifyOTP, 
    SetNewPassword,
    GetNewToken
};