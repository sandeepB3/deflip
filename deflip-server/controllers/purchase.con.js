import { db } from '../utils/db.js';
import util from 'util'
const promisify = util.promisify;
const queryAsync = promisify(db.query).bind(db);
export const makePurchase=async(req,res,next)=>{
    const{productID,userID,quantity}=req.body
    console.log(req.body)
    db.query( `INSERT INTO PURCHASE(productID,userID,quantity) VALUES (?,?,?)`,[productID,userID,quantity],async(err,result)=>{
        if(err){
            res.send({
                code: 400,
                failed: 'error occurred',
                error: err,
            });
        }
        else{
            res.send({
                status: 'Purchase Added',
                status_code: 200
                });
        }
    })
    }
    export const purchaseCart=async(req,res,next)=>{
        try{
            const{items,total,userID}=req.body
            const currentDate=new Date()

            const response=await queryAsync(`INSERT INTO ORDERS(userID,total,orderDate) VALUES (?,?,?)`,[userID,total,currentDate])
            console.log(response.insertId)
            for(let item of items){
                db.query( `UPDATE PRODUCT
                SET quantity = quantity - ?
                WHERE productID = ?`,[item.quantity,item.productID])
                db.query( `INSERT INTO PURCHASE(productID,userID,quantity,orderID,purchaseDate) VALUES (?,?,?,?,?)`,[item.productID,userID,item.quantity,response.insertId,currentDate])
            }
            res.send({
                status: 'Purchase Added',
                status_code: 200
                });

        }catch(e){
            res.status(500).send({
                failed:'error occurred',
                error:e
            })
        }
        
         
        }
    