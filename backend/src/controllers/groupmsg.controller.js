import GroupMsg from "../models/GroupMessage.model.js";
import User from '../models/user.model.js'
import Group from '../models/Groups.model.js'
import cloudinary from '../lib/cloudinary.js'
import {io,findUsersocketid} from '../lib/socket.js'


export const sendMessageingroup=async(req,res)=>{
    try{
        const senderId=req.userId
        const groupId=req.params.id
        const {text,image}=req.body

        let img;
        if(image){
            const result=await cloudinary.uploader.upload(image)
            img=result.secure_url
        }

        const newmsg=new GroupMsg({
            senderId,
            groupId,
            text,image:img
        })
        await newmsg.save()

        
            io.to(String(groupId)).emit("receiveMessage",newmsg)
        


        res.json(newmsg)




    }
    catch(err){
        console.log(err)
    }
}

export const getGroupMessages=async(req,res)=>{
    try{
        const senderId=req.userId
        const groupId=req.params.id

         const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

        const groupmsgs=await GroupMsg.find({groupId}).populate("senderId", "name image")
 .sort({createdAt:1});

        res.json(groupmsgs)


    }
    catch(err){
        console.log(err)
    }
}