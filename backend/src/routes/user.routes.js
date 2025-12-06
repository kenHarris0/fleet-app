import express from 'express'

 const router=express.Router()
import authMiddleware from "../middlewares/auth.middleware.js"
import {login,logout,signup,getuserdata,updateProfilepic} from "../controllers/user.controller.js"


router.post('/login',login)
router.post('/signup',signup)
router.post('/logout',logout)
router.get('/getuserdata',authMiddleware,getuserdata)
router.post('/check',authMiddleware,(req,res)=>{
    try{
        res.json({success:true,message:"user Authenticated"})

    }
    catch(err){
        console.log(err)
    }
})

router.post('/updatepic',authMiddleware,updateProfilepic)

export default router