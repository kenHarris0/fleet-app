import Message from "../models/message.model.js"
import User from "../models/user.model.js"
import cloudinary from "../lib/cloudinary.js"
import {findUsersocketid} from '../lib/socket.js'
import {io} from '../lib/socket.js'

export const sendMessage=async(req,res)=>{
    try{
        const senderId=req.userId
        const {text,image}=req.body
        const receiverId=req.params.id
        let Image;
        if(image){
            const result=await cloudinary.uploader.upload(image)
            Image=result.secure_url
        }

        const newmsg=new Message({
            senderId,
            receiverId,
            text,
            image:Image
        })
        await newmsg.save()
         const senderSocket=findUsersocketid(senderId)
        if (senderSocket) {
  io.to(senderSocket).emit("Getmessages", newmsg); // sender sees message instantly
}

        const receiverSocket=findUsersocketid(receiverId)
        if(receiverSocket){
            
                
            io.to(receiverSocket).emit("Getmessages",newmsg)




        }
        res.json(newmsg)



    }
    catch(err){
        console.log(err)
    }

}

 export const getMessagebyId=async(req,res)=>{
    const senderId=req.userId
    const receiverId=req.params.id

    try{
        const messages=await Message.find({
            $or:[
                {senderId:senderId,receiverId:receiverId},
                 {senderId:receiverId,receiverId:senderId}
            ]
        }).sort({createdAt:1})

        res.json(messages)


    }
    catch(err){
        console.log(err)
    }
 }

 export const getAllPeople=async(req,res)=>{
    try{
        const userId=req.userId
        const users=await User.find({_id: {$ne:userId}}).select("-password")

        res.json(users)

    }
    catch(err){
        console.log(err)
    }
 }

 export const getAllFriends=async(req,res)=>{
    try{
        const userId=req.userId
        const userfriends=await User.findById(userId).populate("friends", "-password")

        res.json(userfriends.friends)

    }
    catch(err){
        console.log(err)
    }
 }

 export const getAllChats=async(req,res)=>{

try{
     const senderId=req.userId
   

    const messages=await Message.find({
        $or:[
            {senderId:senderId},{receiverId:senderId},
           

        ]
    })

    const chatpartners=[...new Set(messages.map(message=>message.senderId.toString()===senderId.toString()?message.receiverId.toString():message.senderId.toString()))]

    const partners=await User.find({_id:{$in:chatpartners}}).select("-password")
        
res.json(partners)
    }
    catch(err){
        console.log(err)
    }


 }