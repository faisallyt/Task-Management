const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require('../config');


function userMiddleware(req,res,next){
    const username=req.body.username;
    const token=req.headers.authorization;

    const words=token.split(" ");

    const jwt_token=words[1];

    const decodedValue=jwt.verify(jwt_token,JWT_SECRET);

    if(decodedValue.username){
        req.username=decodedValue.username;
        next();
    }
    else{
        res.status(403).json({
            message:'unautorized, please sign in with proper credentials',
        })
    }
}

module.exports=userMiddleware;
