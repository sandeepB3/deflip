import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import express from 'express'
import { connectToDatabase } from './utils/db.js'

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cors());

//Route Imports
import userRoute from './routes/user.js'
import supplierRoute from './routes/supplier.js'
import productRoute from './routes/product.js'
import purchaseRoute from './routes/purchase.js'
import notificationRoute from './routes/notification.js'
import couponRoute from './routes/coupons.js'

//Route uses
app.use('/user', userRoute)
app.use('/supplier', supplierRoute)
app.use('/product', productRoute)
app.use('/purchase', purchaseRoute)
app.use('/notification', notificationRoute)
app.use('/coupon', couponRoute)

app.get("/", (req,res) =>{
    res.send("This is index.js");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectToDatabase();
});
