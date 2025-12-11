    import express from 'express'
    const router=express.Router()
    import authMiddleware from "../middlewares/auth.middleware.js"
    import {getUserGroups,createGroup,makeAdmin,updateGroupPic,removeUserfromgroup,addUsertogroup,modifyDescription,assignUserTospecialGroup} from "../controllers/Group.controller.js"

    router.use(authMiddleware)

    router.post('/create',createGroup)
    router.get('/get',getUserGroups)
    router.post('/makeadmin/:id',makeAdmin)
    router.post('/updatepic',updateGroupPic)
    router.post('/removeUser/:id',removeUserfromgroup)
      router.post('/addtogrp/:id',addUsertogroup)

router.post('/updatedesc/:id',modifyDescription)

router.post('/assign',assignUserTospecialGroup)

    export default router