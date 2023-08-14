import express from 'express'
import { addSupplier,loginSupplier,logoutSupplier,getTopCustomers,checkAuth } from '../controllers/supplier.con.js'

const router = express.Router( {mergeParams:true} )

router.post('/add', addSupplier)
router.post('/login', loginSupplier)
router.get('/login', checkAuth)
router.post('/logout', logoutSupplier)
// router.post('/getDashboardData', getProducts)
router.get('/getTopCustomers/:supplierID',getTopCustomers)
export default router;