import { db } from '../utils/db.js';
import { Readable } from 'stream';
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'ap-southeast-2',
  secretAccessKey: 'iE/4Py1djAvIZHLKkWES7ivxB/BWvicWJE8d6iSG',
  accessKeyId: 'AKIA2LRBOLN4VTG5FFJW',
});

const s3 = new AWS.S3();

export const addImage = async (req, res) => {
  try {
    const { productID } = req.params;

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

    await db.query(
      `UPDATE PRODUCT
      SET imgURL = ?
      WHERE productID = ?`,
      [uploadResult.Location, productID]
    );

    console.log('Upload successful:', uploadResult.Location);
    res.status(200).send('Image uploaded successfully.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};


export const addProduct = async (req, res) => {
  const { productName, cost, supplierID, category, description, brandName, quantity } = req.body;

  try {
    db.query(
      `INSERT INTO PRODUCT(productName, cost, supplierID, category, description, brandName, quantity) VALUES (?,?,?,?,?,?,?)`,
      [productName, cost, supplierID, category, description, brandName, quantity],
      async (error, result) => {
        if (error) {
          console.error(error);
          
          return res.status(500).send({
            status: 'Error adding product',
            status_code: 500,
            error: error,
          });
        }

        const insertedProductId = result.insertId;
        console.log(insertedProductId);

        console.log('Product added successfully');
        res.status(200).send({
          status: 'Product added successfully',
          status_code: 200,
          productID: insertedProductId, 
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};


export const getAllProducts = async (req, res) => {
  try {
    
    const { supplierID } = req.params;
    db.query(`SELECT * FROM PRODUCT WHERE supplierId = ?`, [supplierID], async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send({
          status_code: 500,
          message: 'An error occurred',
          error: err,
        });
      }

      if (result) {
        res.send({
          status_code: 200,
          message: 'Data Returned',
          products: result,
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status_code: 500,
      message: 'Internal server error',
      error: err,
    });
  }
};
