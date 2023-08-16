import express from 'express'
import { registerUser, loginUser, getProfile, getOrders, getPurchasedItems } from '../controllers/user.con.js'
import { verifyUserToken } from '../middlewares/verifyUser.js'

const router = express.Router( {mergeParams:true} )

router.post('/signup', registerUser)
router.post('/signin', loginUser)
router.get('/getOrders/:userID', getOrders)
router.get('/getPurchasedItems/:orderID', getPurchasedItems)
router.get('/profile', verifyUserToken, getProfile);

export default router;