import {db} from '../utils/db.js'
import bcrypt from 'bcrypt'
export const registerUser=async(req,res,next)=>{
    const {emailID,password}=req.body;
     const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds)
    
    db.query(
        `INSERT INTO USERS(emailID,password) VALUES (?,?)`,[emailID,encryptedPassword],(err,result)=>
        {
            if(err){
            console.log(err)
        }
        else{
            console.log(result)
            res.send({
                status:"Admin Account successfully created",
                "status_code": 200,
                
            })
        }
    }
    )
}