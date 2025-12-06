import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import dotenv from 'dotenv'
dotenv.config()



export const socketProxy=async(socket,next)=>{

    try{
const token=socket.handshake.headers.cookie?.split(";")
.find(row=>row.startsWith("jwt=")).split("=")[1];

if(!token){
    return res.json({message:"socket has no cookie tokens"})
}
const decoded=jwt.verify(token,process.env.JWT_SECRET)
 if(!decoded){
            console.log("Socket connection refused :INVALID TOKEN")
            return next(new Error("INVALID TOKEN"))
        }

    const user=await User.findById(decoded.userId).select("-password")
    socket.user = user;
socket.userId = user._id;


    return next()






    }

    catch (err) {
    console.log("Socket Auth Error:", err.message);
    next(new Error("Invalid Token"));
  }
}

export default socketProxy