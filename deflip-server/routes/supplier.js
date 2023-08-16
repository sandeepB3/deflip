import express from 'express'
import { addSupplier, loginSupplier, logoutSupplier, getTopCustomers, loadData } from '../controllers/supplier.con.js'
import { sendTopCustomerTokens } from '../helper/SellerContract.js'
import { verifySupplierToken } from '../middlewares/verifySupplier.js' 

const router = express.Router( {mergeParams:true} )

router.post('/add', addSupplier)
router.post('/login', loginSupplier)
router.post('/sendTokens', sendTopCustomerTokens)
router.post('/logout', logoutSupplier)
router.get('/getDashboardData/:supplierID', loadData)
router.get('/getTopCustomers/:supplierID', getTopCustomers)

export default router;
