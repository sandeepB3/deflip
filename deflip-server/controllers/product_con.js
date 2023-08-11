import {db} from '../utils/db.js'
import { Readable } from 'stream';
import AWS from 'aws-sdk'
AWS.config.update({
    region:'ap-southeast-2',
    secretAccessKey:'iE/4Py1djAvIZHLKkWES7ivxB/BWvicWJE8d6iSG',
    accessKeyId:'AKIA2LRBOLN4VTG5FFJW',
})
const s3=new AWS.S3();
export const addProduct=async(req,res,next)=>{
    const {productName,cost,supplierID,category}=req.body;
    db.query(
        `INSERT INTO PRODUCT(productName,cost,supplierID,category) VALUES (?,?,?,?)`,[productName,cost,supplierID,category],(err,result)=>
        {
            if(err){
            console.log(err)
        }
        else{
            console.log(result)
            res.send({
                status:"Product added successfully",
                "status_code": 200,
                
            })
        }
    }
    )
}
export const addImage=async(req,res,next)=>{
    const {productID}=req.params
    if (!req.file) {
        return res.status(400).send('No image uploaded.');
      }
    
      // Create a readable stream from the buffer
      const imageStream = new Readable();
      imageStream.push(req.file.buffer);
      imageStream.push(null);
    console.log(req.file.originalname)
    const uploadParams={
        Bucket:'flipkart-grid',
        Body:imageStream,
        ACL:"public-read",
        Key:req.file.originalname,
        ContentType:req.file.mimetype
    }
    s3.upload(uploadParams, (err, data) => {
        if (err) {
          console.error('Error uploading:', err);
          return res.status(500).send('Error uploading image.');
        }
        db.query(
            `UPDATE PRODUCT
            SET imgURL = ?
            WHERE productID = ?
            `,[data.Location,productID],(err,result)=>
            {
                if(err){
                console.log(err)
            }
            else{
                console.log('Upload successful:', data.Location);
                res.status(200).send('Image uploaded successfully.');
            }
        }
        )
        
      });
}