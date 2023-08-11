import dotenv from "dotenv"
dotenv.config()

import express from 'express'
import { connectToDatabase } from './utils/db.js'

const app = express();
const port = 4000;

app.use(express.json());

//Route Imports
import userRoute from './routes/user.js'
import supplierRoute from './routes/supplier.js'
import productRoute from './routes/product.js'

//Route uses
app.use('/user', userRoute)
app.use('/supplier', supplierRoute)
app.use('/product', productRoute)

app.get("/", (req,res) =>{
    res.send("This is index.js");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectToDatabase();
});