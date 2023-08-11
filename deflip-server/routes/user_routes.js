import express from 'express'
const router=express.Router({mergeParams:true})
import { registerUser,loginUser } from '../controllers/user_con.js'
router.route('/signup')
.post(registerUser)


router.route('/signin')
.post(loginUser)



export default router;