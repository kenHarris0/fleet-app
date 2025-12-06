import {Server} from 'socket.io'
import express from 'express'
import http from 'http'
import socketProxy from '../middlewares/socketMiddleware.js'


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


    socket.on("disconnect",()=>{
        console.log("socket connected - ",socket.user.name)
        delete mapUseridtosocketid[socket.userId]
    })



})

export {io,server ,app}