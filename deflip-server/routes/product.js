import express from 'express'
import multer from 'multer'
import { addProduct, addImage } from '../controllers/product.con.js'

const router = express.Router({ mergeParams:true })
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/add', addProduct)
router.post('/addImage/:productID', upload.single('image'),addImage)

export default router;