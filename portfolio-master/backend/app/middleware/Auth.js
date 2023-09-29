import jwt from 'jsonwebtoken';

const VerifyToken = (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if(data!==null){
            next();        
        }
        else{
            res.status(401).json({message:'Token Verification Failed!'});
        }    
    }
    catch(e){
        res.status(401).json({message:'Token Verification Failed!', errors:e});
    }
}
export default VerifyToken;