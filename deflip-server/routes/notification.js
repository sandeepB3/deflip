import express from 'express'
import { getNotifications } from '../controllers/notification.con.js'

const router = express.Router( {mergeParams:true} )

router.post('/fetch/:userID', getNotifications)

export default router;
