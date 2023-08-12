import express from 'express'
import multer from 'multer'
import { addProduct, addImage } from '../controllers/product.con.js'
import { authenticateSupplier } from '../middlewares/authenticateSupplier.js';

const router = express.Router({ mergeParams:true })
const storage = multer.memoryStorage();
const upload = multer({ storage });
//protected routes postman pe nai test kar paraha
router.post('/add',authenticateSupplier, addProduct)
router.post('/addImage/:productID',authenticateSupplier, upload.single('image'),addImage)
// router.post('/add',addProduct)
// router.post('/addImage/:productID',upload.single('image'),addImage)
export default router;