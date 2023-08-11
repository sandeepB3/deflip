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
export const loginUser=async(req,res,next)=>{
    const {emailID,password} = req.body;
  
    db.query(`SELECT password FROM USERS WHERE emailID=?`, [emailID], async (err, result) => {
      console.log(result);
      if (err) {
        res.send({
          "code": 400,
          "failed": "error occurred",
          "error": err
        })
      } else {
        if (result) {
          console.log(result[0].userID)
          const comparison = await bcrypt.compareSync(password, result[0].password)
          if (comparison) {
            // console.log("Auth Success");
            
            res.send({
              "status": "Login successful",
              "status_code": 200,
              "user_id": result[0].userID,
            })
          } else {
            res.send({
              status:"declined"
            })
            // console.log("Declined");
          }
        }
      }
    })
}

  