import express from 'express'
import { getNotifications } from '../controllers/notification.con.js'

const router = express.Router( {mergeParams:true} )

// router.post('/make', makePurchase)
router.post('/fetch', getNotifications)

export default router;
