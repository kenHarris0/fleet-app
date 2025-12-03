import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
// imports
import { connectDB } from './lib/db.js'
import userRouter from "./routes/user.routes.js"
import messageRouter from './routes/message.routes.js'


const app=express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())


app.use('/user',userRouter)
app.use('/msg',messageRouter)


app.listen(5000,()=>{
    connectDB()
    console.log("server running")
})