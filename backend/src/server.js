import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
// imports
import { connectDB } from './lib/db.js'
import userRouter from "./routes/user.routes.js"
import messageRouter from './routes/message.routes.js'
import {server,app} from './lib/socket.js'
import chatRouter from './routes/chat.routes.js'
import Grouprouter from './routes/group.routes.js'
import gpmsgRouter from './routes/grpmsg.routes.js'
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json({limit:"20mb"}))
app.use(cookieParser())


app.use('/user',userRouter)
app.use('/msg',messageRouter)
app.use('/chat',chatRouter)
app.use('/grp',Grouprouter)
app.use('/grpmsg',gpmsgRouter)

server.listen(5000,()=>{
    connectDB()
    console.log("server running")
})