import jwt from 'jsonwebtoken';

const GenerateTokens = (obj)=>{
    const accessToken = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn:'3h'
    });
    const refreshToken = jwt.sign(obj, process.env.REFRESH_TOKEN_SECRET);    
    return {accessToken, refreshToken};
}

export default GenerateTokens;