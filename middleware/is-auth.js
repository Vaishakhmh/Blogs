const jwt=require('jsonwebtoken');
const Secretkey = process.env.REACT_APP_KEY || require('../secrets').jwtKey;

module.exports=async(req,res,next)=>{
    const authHeader=req.get('Authorization');
    if(!authHeader)
    {
        req.isAuth=false;
       return  next();
    }
    const token=authHeader
    if(!token)
    {
        req.isAuth=false;
       return  next();
    }
    let decoded;
    try{
        decoded=jwt.verify(token,Secretkey)
    }catch(err)
    {
        req.isAuth=false;
        return next();
    }
    req.isAuth=true;
    req.userId=decoded.userId;
    return  next();
}