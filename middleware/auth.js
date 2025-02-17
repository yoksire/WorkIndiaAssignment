import jwt from 'jsonwebtoken';

const authUser = async (req,res,next)=>{
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,messsage: 'Not Authorized Login Again'})
    }
    try{
        const token_decode = jwt.verify(token,process.env.SECRET_JWT);
        req.body.userId = token_decode.id
        next();
    }catch(error){
        console.log(error);
        res.json({success:false,message: error.messsage})
        
    }
}

export default authUser