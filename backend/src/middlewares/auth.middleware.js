import jwt from "jsonwebtoken"
import User from '../models/user.model.js'

const authMiddleware=async(req,res,next)=>{
    try{
    const token=req.cookies.jwt;
    if(!token){
        return res.json({message:"no token found"})
    }

    const verifyToken=jwt.verify(token,process.env.JWT_SECRET)

    if(verifyToken){
       

        const user = await User.findById(verifyToken.userId)
          if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
        req.user=user
         req.userId=user._id

         next()
    }

    
        

    }
    catch(err){
        console.log(err)
    }
}

export default authMiddleware;