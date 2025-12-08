    import express from 'express'
    const router=express.Router()
    import authMiddleware from "../middlewares/auth.middleware.js"
    import {getUserGroups,createGroup,makeAdmin,updateGroupPic} from "../controllers/Group.controller.js"

    router.use(authMiddleware)

    router.post('/create',createGroup)
    router.get('/get',getUserGroups)
    router.post('/makeadmin/:id',makeAdmin)
    router.post('/updatepic',updateGroupPic)



    export default router