import express from 'express'
const router=express.Router()
import authMiddleware from "../middlewares/auth.middleware.js"
import {sendMessage,getMessagebyId,getAllPeople,getAllFriends,getAllChats,} from "../controllers/message.controller.js"

router.use(authMiddleware)

router.post('/send/:id',sendMessage)
router.get('/getmsg/:id',getMessagebyId)
router.get('/people',getAllPeople)
router.get('/friends',getAllFriends)
router.get('/chats',getAllChats)



export default router