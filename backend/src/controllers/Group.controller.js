import Group from "../models/Groups.model.js";
import { io, findUsersocketid } from "../lib/socket.js";

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
