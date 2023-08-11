import express from 'express'
var app = express()
import {connectToDatabase,db} from './utils/db.js'
import bcrypt from 'bcrypt'
import userRoute from './routes/user_routes.js'

app.use(express.json());

app.post('/signup',async(req,res)=>{
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
})
app.use('/user',userRoute)
app.listen(4000,function(){
    console.log("App listening on port 4000");
    connectToDatabase();
})