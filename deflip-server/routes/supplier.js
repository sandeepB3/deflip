import express from 'express'
import { addSupplier, loginSupplier, logoutSupplier, getTopCustomers, loadData, getAuth } from '../controllers/supplier.con.js'
import { sendTopCustomerTokens } from '../helper/SellerContract.js'
import { verifySupplierToken } from '../middlewares/verifySupplier.js' 

const router = express.Router( {mergeParams:true} )

router.post('/add', addSupplier)
router.post('/login',loginSupplier)
router.post('/sendTokens',verifySupplierToken , sendTopCustomerTokens)
router.post('/logout', logoutSupplier)
router.get('/getDashboardData/:supplierID', loadData)
router.get('/getTopCustomers/:supplierID', getTopCustomers)
router.get('/auth', verifySupplierToken, getAuth)

export default router;
