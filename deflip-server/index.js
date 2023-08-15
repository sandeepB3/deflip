import dotenv from "dotenv"
dotenv.config()
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import { connectToDatabase } from './utils/db.js'
import MySQLStore from 'express-mysql-session';
import userRoute from './routes/user.js'
import supplierRoute from './routes/supplier.js'
import productRoute from './routes/product.js'
import purchaseRoute from './routes/purchase.js'
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import {promisify} from 'util'
import { db } from "./utils/db.js"


const MySQLStoreSession = MySQLStore(session);
const app = express();
const port = 4000;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
// app.use(cookieParser())

// var sessionStore=new MySQLStoreSession({
//     expiration:1000000000,
//     createDatabaseTable:true,
//     schema:{
//         tableName:'sessiontbl',
//         columnNames:{
//             session_id:'sessionID',
//             expires:'expires',
//             data:'data'
//         }
//     }
// },db)
app.use(session({
    key:'key',
    secret: 'keyboard cat',
    // store:sessionStore,
    resave: false,
    saveUninitialized: true,
  }))
// app.use((req,res,next)=>{
//     req.session.saveAsync = promisify(req.session.save.bind(req.session));
//     req.session.supplier={}
//     next();
// })
//Route Imports

//Route uses

app.use('/user', userRoute)
app.use('/supplier', supplierRoute)
app.use('/product', productRoute)
app.use('/purchase', purchaseRoute)

app.get("/", (req,res) =>{
    res.send("This is index.js");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectToDatabase();
});