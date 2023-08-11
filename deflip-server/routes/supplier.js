import express from 'express'
import { addSupplier } from '../controllers/supplier.con.js'

const router = express.Router( {mergeParams:true} )

router.post('/add', addSupplier)

export default router;