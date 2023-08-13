import { db } from '../utils/db.js';
import { Readable } from 'stream';
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'ap-southeast-2',
  secretAccessKey: 'iE/4Py1djAvIZHLKkWES7ivxB/BWvicWJE8d6iSG',
  accessKeyId: 'AKIA2LRBOLN4VTG5FFJW',
});

const s3 = new AWS.S3();


export const addProduct = async (req, res, next) => {
  try {
    const { productName, cost, supplierID, category,description,brandName,quantity } = req.body;
    if (!req.file) {
      return res.status(400).send('No image uploaded.');
    }
  
 
      const imageStream = new Readable();
      imageStream.push(req.file.buffer);
      imageStream.push(null);
  
      console.log(req.file.originalname);
  
      const uploadParams = {
        Bucket: 'flipkart-grid',
        Body: imageStream,
        ACL: 'public-read',
        Key: req.file.originalname,
        ContentType: req.file.mimetype,
      };
  
      const uploadResult = await s3.upload(uploadParams).promise();
  
      // await db.query(
      //   `UPDATE PRODUCT
      //   SET imgURL = ?
      //   WHERE productID = ?`,
      //   [uploadResult.Location, productID]
      // );
  
      console.log('Upload successful:', uploadResult.Location);
      res.status(200).send('Image uploaded successfully.');
  
    
    
    db.query(`INSERT INTO PRODUCT(productName, cost, supplierID, category,description,brandName,quantity,imgURL) VALUES (?,?,?,?,?,?,?,?)`,
      [productName, cost, supplierID, category,description,brandName,quantity,uploadResult.Location],async(res,err)=>{
        if(res){
          
          console.log(res)
          console.log('Product added successfully');
          res.send({
                  status: 'Product added successfully',
                status_code: 200,
                  });
        }
        else{
          console.log(err)
        }
      })
    }catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};


export const addImage = async (req, res) => {
  const { productID } = req.params;
 
};
