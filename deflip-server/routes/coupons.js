import express from 'express'
import { createCoupon,fetchUnlockedCoupons,unlockCoupon,fetchLockedCoupons,validateCoupon } from '../controllers/coupons.con.js'

const router = express.Router( {mergeParams:true} )

router.post('/create', createCoupon)
router.get('/fetchUnlocked/:userID', fetchUnlockedCoupons)
router.get('/fetchLocked/:userID', fetchLockedCoupons)
router.post('/unlock', unlockCoupon)
router.post('/validate', validateCoupon)

export default router;
