import express from 'express'
import { purchaseCart } from '../controllers/purchase.con.js'

const router = express.Router( {mergeParams:true} )

// router.post('/make', makePurchase)
router.post('/cart', purchaseCart)

export default router;
