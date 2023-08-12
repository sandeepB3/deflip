import express from 'express'
import { addSupplier,loginSupplier,logoutSupplier } from '../controllers/supplier.con.js'

const router = express.Router( {mergeParams:true} )

router.post('/add', addSupplier)
router.post('/login', loginSupplier)
router.post('/logout', logoutSupplier)
export default router;