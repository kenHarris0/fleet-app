    import express from 'express'
    const router=express.Router()
    import authMiddleware from "../middlewares/auth.middleware.js"
    import {getUserGroups,createGroup} from "../controllers/Group.controller.js"

    router.use(authMiddleware)

    router.post('/create',createGroup)
    router.get('/get',getUserGroups)



    export default router