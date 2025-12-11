import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import {createCookie} from '../lib/cookieHandler.js'
import cloudinary from "../lib/cloudinary.js"
import {io,findUsersocketid} from '../lib/socket.js'
import Group from '../models/Groups.model.js'
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

        res.json({success:true,payload:user})

       

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
          res.json({success:true,payload:newuser})

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
        res.json({success:true,message:"logged out successfully"})

    }
      catch(err){
        console.log(err)
    }

    
}

export const getuserdata=async(req,res)=>{
    try{
        const userId=req.userId
        const userdata=await User.findById(userId).select("-password")
        res.json({success:true,payload:userdata})

    }
    catch(err){
        console.log(err)
    }
}

export const updateProfilepic=async(req,res)=>{
    try{
        const userId=req.userId
        const profilepic=req.body.profilepic
         if (!profilepic) {
            return res.json({ success: false, message: "No image provided" });
        }
let image;
        
            const result=await cloudinary.uploader.upload(profilepic)
            image=result.secure_url
        

        const user=await User.findByIdAndUpdate(userId,{image:image},{new:true})

        res.json({success:true,payload:image})

    }
     catch(err){
        console.log(err)
    }
}

export const acceptFriendRequest = async (req, res) => {
  try {
    const receiverId = req.userId; 
    const senderId = req.params.id;

    await User.findByIdAndUpdate(receiverId, {
      $pull: { requestpending: senderId },
      $addToSet: { friends: senderId }
    });

    await User.findByIdAndUpdate(senderId, {
      $addToSet: { friends: receiverId },
     
    });

    const senderSocket = findUsersocketid(senderId);
    if (senderSocket) {
      io.to(senderSocket).emit("friendAccepted", {
        receiverId
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};


export const rejectRequest=async(req,res)=>{
    try{
        const receiverId=req.userId
        const senderId=req.params.id

        await User.findByIdAndUpdate(receiverId,{
            $pull:{requestpending:senderId}
        })
        

        const senderSocket = findUsersocketid(senderId);
    if (senderSocket) {
      io.to(senderSocket).emit("friendRejected", {
        receiverId
      });
    }
 res.json({ success: true });



    }
    catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
}

export const Leavegroup=async(req,res)=>{
    try{
        const senderId=req.userId
        const groupId=req.params.id

        const group=await Group.findById(groupId)
        if(!group){
            return res.json({message:"no group found"})
        }
        if (group.admins.length === 1 && group.admins[0].toString() === senderId) {
  return res.json({ message: "You are the only admin, assign another admin before leaving" });
}

      const updatedGroup = await Group.findByIdAndUpdate(
  groupId,
  {
    $pull: { members: senderId, admins: senderId }
  },
  { new: true }
);

return res.json(updatedGroup);


        

    }
    catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
}

export const updateProfile=async(req,res)=>{
  try{
    const senderId=req.userId
    const {aboutme,hobbies,tag,vibe}=req.body
    let newhobbies
    if(hobbies){
       newhobbies=hobbies.split(',')
    }
    let newabout;
    if(aboutme){
      newabout=aboutme
    }
     let newtag;
    if(tag){
      newtag=tag
    }
     let newvibe;
    if(vibe){
      newvibe=vibe
    }
   
  

    const updatedUser=await User.findByIdAndUpdate(senderId,
      {
        aboutme:newabout,
        hobbies:newhobbies,
        tag:newtag,
        vibe:newvibe
      }
    )

    res.json(updatedUser)

  }
    catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
}

export const updatePersonality=async(req,res)=>{
   try{
    const senderId=req.userId
    const {personality}=req.body
  
     const updatedUser=await User.findByIdAndUpdate(senderId,
      {
        personality:personality
      },
      {new:true}
    )

    res.json(updatedUser)

  }
    catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
}

export const getuserbyid = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};
