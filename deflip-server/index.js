var express=require('express')
var app = express()
var mysql = require("mysql");
const bcrypt=require('bcrypt')
const bodyParser = require("body-parser");
app.use(bodyParser.json());
var db = mysql.createConnection({
    host:'database-1.cfs3lkdpwrvj.ap-southeast-2.rds.amazonaws.com',
    database:'deflip',//your database name
    user:'admin',//your user name
    password:'hello1234',//your user password
    port:"3306"
});
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
app.listen(4000,function(){
    console.log("App listening on port 4000");
    db.connect(function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Database connected");
        }
    })
})