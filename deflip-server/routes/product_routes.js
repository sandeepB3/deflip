import express from 'express'
import multer from 'multer'

const router=express.Router({mergeParams:true})
import { addProduct,addImage } from '../controllers/product_con.js'
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.route('/add')
.post(addProduct)
router.route('/addImage/:productID')
.post(upload.single('image'),addImage)


export default router;