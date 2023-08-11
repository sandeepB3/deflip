import {db} from '../utils/db.js'
import bcrypt from 'bcrypt'
export const addSupplier=async(req,res,next)=>{
    const {supplierName,password}=req.body;
    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds)
    
    db.query(
        `INSERT INTO SUPPLIER(supplierName,password) VALUES (?,?)`,[supplierName,encryptedPassword],(err,result)=>
        {
            if(err){
            console.log(err)
        }
        else{
            console.log(result)
            res.send({
                status:"Supplier Account successfully created",
                "status_code": 200,
                
            })
        }
    }
    )
}