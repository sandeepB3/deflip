import express from 'express'
import { makePurchase } from '../controllers/purchase.con.js'

const router = express.Router( {mergeParams:true} )

router.post('/make', makePurchase)

export default router;
