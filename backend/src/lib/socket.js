import {Server} from 'socket.io'
import express from 'express'
import http from 'http'
import socketProxy from '../middlewares/socketMiddleware.js'
import User from '../models/user.model.js'
import Group from '../models/Groups.model.js'



const app=express() 

const server=http.createServer(app)

const io = new Server(server,{
     cors: {
        origin: 'http://localhost:5173',
        credentials: true
    }
    
})

io.use(socketProxy)

let mapUseridtosocketid={}

export const findUsersocketid=(userId)=>{
return mapUseridtosocketid[userId]
}

io.on("connection",async(socket)=>{
    console.log("socket connected - ",socket.user.name)
    mapUseridtosocketid[socket.userId]=socket.id

    io.emit("getOnlineUsers",Object.keys(mapUseridtosocketid))

    socket.on("sendFriendRequest",async({senderId,receiverId})=>{
        const user=await User.findByIdAndUpdate(receiverId,{
            
            $addToSet:{requestpending:senderId}
            
        })
        
        const receiverscoekt=findUsersocketid(receiverId)
        if(receiverscoekt){
            io.to(receiverscoekt).emit("friendRequestNotification",{
                senderId
            })
        }

    })
    //group
    //auto join
    try{
        const groups=await Group.find({members:socket.userId}).select("_id")
        groups.map(group=>{
            socket.join(group._id.toString())
             console.log(`${socket.user.name} joined group: ${group._id}`);
        })

    }
    catch(err){
        console.log(err)
    }

    socket.on("JoinGroup",(groupId)=>{
        socket.join(groupId)
        console.log(`${socket.user.name} joined group: ${groupId}`);
    })

    socket.on("LeaveGroup",(groupId)=>{
        socket.leave(groupId)
        console.log(`${socket.user.name} left group: ${groupId}`);
    })


    socket.on("disconnect",()=>{
        console.log("socket connected - ",socket.user.name)
        delete mapUseridtosocketid[socket.userId]
    })



})

export {io,server ,app}