import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import {createCookie} from '../lib/cookieHandler.js'


export const login=async(req,res)=>{
    const {email,password}=req.body

    try{
        if(!email || !password){
            return res.json({message:"enter all details"})
        }
        const user=await User.findOne({email})
        if(!user){
            return res.json({message:"user dont exists please signup"})
        }

        const checkpswd=await bcrypt.compare(password,user.password)
        if(!checkpswd){
            return res.json({message:"invalid credentials"})
        }
        createCookie(user._id,res)

        res.json({success:true,message:"logged in"})

       

    }
    catch(err){
        console.log(err)
    }

}

export const signup=async(req,res)=>{
    const {name,email,password}=req.body

    try{
        if(!name || !email || !password){
            return res.json({message:"enter all details"})
        }
        const user=await User.findOne({email})
        if(user){
            return res.json({message:"user exists please login"})
        }

        const hashedpswd=await bcrypt.hash(password,10)

        const newuser=new User({
            name,email,
            password:hashedpswd
        })
        await newuser.save()
        createCookie(newuser._id,res)
          res.json({success:true,message:"signed up "})

    }
    catch(err){
        console.log(err)
    }
    
}


export const logout=async(req,res)=>{
    try{
        res.cookie("jwt","",{
            maxAge:0
        })
        res.json({message:"logged out successfully"})

    }
      catch(err){
        console.log(err)
    }

    
}

