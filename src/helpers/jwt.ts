import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

 const generateJwt =  (userData:Object,secret:string,expiresIn:string|number)=>{
    return  jwt.sign(userData,secret,{expiresIn:expiresIn});
}

export default {generateJwt}