import express from 'express'
const router=express.Router()
import authMiddleware from "../middlewares/auth.middleware.js"
import {sendMessageingroup,getGroupMessages} from "../controllers/groupmsg.controller.js"

router.use(authMiddleware)

router.post('/send/:id',sendMessageingroup)
router.get('/getmsg/:id',getGroupMessages)




export default router