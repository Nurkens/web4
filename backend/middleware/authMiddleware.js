import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try{
        const token = req.header('Authorization');
        if(!token) return res.status(400).json({message:"no token provided"});
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) =>{
            if(err) return res.status(400).json({message:"Invalid token"});
            req.user = user;
            next();
        })


    }catch(e){
        console.log(e);
    }
}

export default authMiddleware;