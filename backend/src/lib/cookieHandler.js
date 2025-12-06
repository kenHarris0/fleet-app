
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()

export const createCookie=async(userId,res)=>{

    try{
        const token=jwt.sign({userId:userId},process.env.JWT_SECRET,{expiresIn:"7d"})

        res.cookie("jwt",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:'lax',
            secure:process.env.NODE_ENV==='development'?false:true,
        })

return token;

    }

     catch(err){
        console.log(err)
    }
}