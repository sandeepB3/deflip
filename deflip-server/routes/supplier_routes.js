import express from 'express'
const router=express.Router({mergeParams:true})
import { addSupplier } from '../controllers/supplier_con.js'

router.route('/add')
.post(addSupplier)




export default router;