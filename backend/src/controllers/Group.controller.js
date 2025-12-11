import Group from "../models/Groups.model.js";
import { io, findUsersocketid } from "../lib/socket.js";
import cloudinary from '../lib/cloudinary.js'


export const createGroup = async (req, res) => {
  try {
    const senderId = req.userId;
    const { name, members } = req.body;

    let newMembers = members.map(m => m.toString());

  
    if (!newMembers.includes(senderId.toString())) {
      newMembers.push(senderId);
    }

    const newgrp = new Group({
      name,
      members: newMembers,
      admins: [senderId]
    });

    await newgrp.save();

    newgrp.members.forEach(memberId => {
      const socketId = findUsersocketid(memberId.toString());
      if (socketId) {
        io.to(socketId).emit("groupCreated", newgrp);
      }
    });

    return res.json(newgrp);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error creating group" });
  }
};


export const getUserGroups = async (req, res) => {
  try {
    const senderId = req.userId;

    const groups = await Group.find({
      members: { $in: [senderId] }   
    });

    return res.json(groups);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error fetching groups" });
  }
};


export const makeAdmin= async (req, res) => {
  try {
    const senderId=req.userId
    const receiverId=req.params.id
    const {groupId}=req.body

    const group=await Group.findByIdAndUpdate(groupId,{
    
       $addToSet:{admins:receiverId}
      
    })

    res.json(group)

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error fetching groups" });
  }
};

export const updateGroupPic=async(req,res)=>{
  try{
    const senderId=req.userId;
    const {image,groupId}=req.body
     const egroup=await Group.findById(groupId)
    if(!egroup.admins.includes(senderId)){
      return res.json({message:"only admin can update profile"})
    }
    if (!image) {
      return res.status(400).json({ message: "No image provided" });
    }
let img
    if(image){
      const result=await cloudinary.uploader.upload(image)
      img=result.secure_url
    }
   

    const group=await Group.findByIdAndUpdate(groupId,{
      image:img
    },{new:true})

    res.json(group)

  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error fetching groups" });
  }
}

export const removeUserfromgroup=async(req,res)=>{
  try{
    const senderId=req.userId
    const removeId=req.params.id
const {groupId}=req.body

const group=await Group.findById(groupId)
if(!group){
  return res.json({message:"no group found"})
}
const updatedgrp=await Group.findByIdAndUpdate(groupId,{
  $pull:{members:removeId,admins:removeId},
  

},{new:true})

res.json(updatedgrp)

  }
  catch(err){
    console.log(err)
  }
}

export const addUsertogroup=async(req,res)=>{
  try{
    const senderId=req.userId
    const adderId=req.params.id
const {groupId}=req.body

const group=await Group.findById(groupId)
if(!group){
  return res.json({message:"no group found"})
}


const updatedgrp=await Group.findByIdAndUpdate(groupId,{
  $addToSet:{members:adderId},
  

},{new:true})

res.json(updatedgrp)

  }
  catch(err){
    console.log(err)
  }
}

export const modifyDescription=async(req,res)=>{
  try{
    const senderId=req.userId
    const {description}=req.body
    const groupId=req.params.id
const group=await Group.findById(groupId)
if(!group){
  return res.json({message:"no group found"})
}
if(!group.admins.includes(senderId)){
  return res.json({message:"only admin can modify group description"})
}
const updatedgrp=await Group.findByIdAndUpdate(groupId,
 {description:description},{new:true})
 res.json(updatedgrp)



  }
  catch(err){
    console.log(err)
  }
}

export const assignUserTospecialGroup=async(req,res)=>{
  try{
    const senderId=req.userId
    const {groupName}=req.body

    const group=await Group.findOne({name:groupName})
    if(!group){
      return res.json({message:"no group found server issue"})
    }
    if (group.members.includes(senderId)) {
  return res.json({ message: "Already in the group", groupName });
}


    const sgroup=await Group.findOneAndUpdate({name:groupName},{
      $addToSet:{members:senderId}
    },{new:true})


    res.json(sgroup)


  }
  catch(err){
    console.log(err)
  }
}