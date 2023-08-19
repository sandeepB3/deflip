import express from 'express'
import { createCoupon,fetchCoupons,unlockCoupon } from '../controllers/coupons.con.js'

const router = express.Router( {mergeParams:true} )

router.post('/create', createCoupon)
router.get('/fetch/:userID', fetchCoupons)
router.post('/unlock', unlockCoupon)

export default router;
