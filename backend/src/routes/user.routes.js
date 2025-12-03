import express from 'express'

 const router=express.Router()

import {login,logout,signup} from "../controllers/user.controller.js"


router.post('/login',login)
router.post('/signup',signup)
router.post('/logout',logout)

router.post('/check',(req,res)=>{
    try{
        res.json({message:"user Authenticated"})

    }
    catch(err){
        console.log(err)
    }
})

export default router