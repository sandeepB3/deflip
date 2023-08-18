import express from 'express'
import multer from 'multer'
import { addProduct, addImage, getAllProducts, getProductsByCategory } from '../controllers/product.con.js'
import { verifySupplierToken } from '../middlewares/verifySupplier.js'

const router = express.Router({ mergeParams:true })
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/add', verifySupplierToken, addProduct)
router.get('/allProducts/:supplierID', getAllProducts)
router.post('/addImage/:productID', verifySupplierToken, upload.single('image'),addImage)
router.get('/:category', verifySupplierToken, getProductsByCategory)

export default router;
