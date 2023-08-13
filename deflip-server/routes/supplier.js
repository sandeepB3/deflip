import express from 'express'
import { addSupplier,getProducts,loginSupplier,logoutSupplier } from '../controllers/supplier.con.js'

const router = express.Router( {mergeParams:true} )

router.post('/add', addSupplier)
router.post('/login', loginSupplier)
router.post('/logout', logoutSupplier)
router.post('/getDashboardData', getProducts)
export default router;