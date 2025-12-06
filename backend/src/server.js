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


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json({limit:"10mb"}))
app.use(cookieParser())


app.use('/user',userRouter)
app.use('/msg',messageRouter)


server.listen(5000,()=>{
    connectDB()
    console.log("server running")
})