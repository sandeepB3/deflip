import express from 'express'
import { registerUser, loginUser ,getOrders,getPurchasedItems} from '../controllers/user.con.js'

const router = express.Router( {mergeParams:true} )

router.post('/signup', registerUser)
router.post('/signin', loginUser)
router.get('/getOrders/:userID', getOrders)
router.get('/getPurchasedItems/:orderID', getPurchasedItems)

export default router;