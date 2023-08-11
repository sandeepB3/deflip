import express from 'express'
const router=express.Router({mergeParams:true})
import { registerUser } from '../controllers/user_con.js'
router.route('/signup')
.post(registerUser)

export default router;