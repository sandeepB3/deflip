import dotenv from "dotenv"
dotenv.config()

// import fileUpload from "express-fileupload"

// import multerS3 from 'multer-s3'
import express from 'express'
var app = express()
import {connectToDatabase,db} from './utils/db.js'
import userRoute from './routes/user_routes.js'
import supplierRoute from './routes/supplier_routes.js'
import productRoute from './routes/product_routes.js'

app.use(express.json());
// app.use(fileUpload())


// app.post("/upload",upload.single('image'),async (req,res)=>{
    
    
// })
app.use('/user',userRoute)
app.use('/supplier',supplierRoute)
app.use('/product',productRoute)

app.listen(4000,function(){
    console.log("App listening on port 4000");
    connectToDatabase();
})