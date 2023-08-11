import express from 'express'
import { registerUser, loginUser } from '../controllers/user.con.js'

const router = express.Router( {mergeParams:true} )

router.post('/signup', registerUser)
router.post('/signin', loginUser)

export default router;