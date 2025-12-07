import express from 'express'
const router=express.Router()
import authMiddleware from "../middlewares/auth.middleware.js"
import {updateChatbg,getaallchats} from "../controllers/chat.controller.js"

router.use(authMiddleware)

router.post('/update',updateChatbg)
router.get('/getallchat',getaallchats)



export default router