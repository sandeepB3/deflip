import { db } from '../utils/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
const queryAsync = promisify(db.query).bind(db);
import { deploySellerContract, sendSupplierTokens,tokenBalance } from '../helper/SellerContract.js';

export const addSupplier = async (req, res) => {
    try {
      const { supplierName, password, address } = req.body;
      const saltRounds = 10;
      const encryptedPassword = await bcrypt.hash(password, saltRounds);

      const sellerAddress = await deploySellerContract(supplierName);
      console.log(sellerAddress)

      const tokens = await sendSupplierTokens(supplierName, 1000);
      console.log(tokens)

      const result = await queryAsync(
        `INSERT INTO SUPPLIER(supplierName, password, address, contractAdd) VALUES (?, ?, ?, ?)`,
        [supplierName, encryptedPassword, address, sellerAddress]
      );
     
      const supplier = {
        supplierID: result.insertId,
        email: supplierName,
        address: address,
        contract: sellerAddress
      }

      const accessToken = jwt.sign({ supplier }, process.env.SECRET_KEY, { expiresIn: process.env.AT_EXP });

      res.cookie('access_token', accessToken, {
        httpOnly: true,
        maxAge: parseInt(process.env.AT_EXP) * 1000,
      });

      console.log('Supplier Account successfully created');
      res.send({
        status: 'Supplier Account successfully created',
        status_code: 200,
        supplier: supplier,
        token: accessToken,
      });

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
};


export const loginSupplier = async (req, res) => {
  try {
    const { supplierName, password } = req.body;

    db.query(`SELECT * FROM SUPPLIER WHERE supplierName = ?`, [supplierName], async (err, result1) => {
      if (err) {
        console.error(err);
        return res.status(400).send({
          status_code: 400,
          message: 'An error occurred',
          error: err,
        });
      }
      if (result1 && result1[0]) {
        const comparison = await bcrypt.compare(password, result1[0].password);
        if (comparison) {
          
          const supplier = {
            supplier_id: result1[0].supplierID,
            email: result1[0].supplierName,
            address: result1[0].address,
            contract: result1[0].contractAdd
          }
          
          const accessToken = jwt.sign({ supplier }, process.env.SECRET_KEY, { expiresIn: process.env.AT_EXP });

          res.status(200).send({
            message: 'Auth Successfull',
            supplier,
            token: accessToken
          })

        }
        else {
          res.status(401).send({
            message: 'Authentication Declined',
            supplier: {},
          });
        }
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


export const logoutSupplier = async (req, res, next) => {
  try {
    res.status(201).send({
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status_code: 500,
      message: "Internal server error",
      error: err,
    });
  }
};

export const getAuth = async(req, res) => {
  const { supplier } = req.supplier
  try{
    res.status(200).send({
      message: "Token Authorization",
      supplier
    })
  }catch(err){
    res.status(500).send({
      status_code: 500,
      message: "Internal server error",
      error: err,
    });
  }
}

export const getTopCustomers = async (req, res) => {
  try {
    const { supplierID } = req.params;

    const query = `
      SELECT U.userID, U.emailID, SUM(P.quantity) AS total_quantity_bought
      FROM USERS U
      JOIN PURCHASE P ON U.userID = P.userID
      JOIN PRODUCT PR ON P.productID = PR.productID
      JOIN SUPPLIER S ON PR.supplierID = S.supplierID
      WHERE S.supplierID = ?
      GROUP BY U.userID
      ORDER BY total_quantity_bought DESC
      LIMIT 10
    `;

    db.query(query, [supplierID], async (err, result) => {
      if (result) {
        res.send({
          result,
        });
      } else {
        console.error(err);
        res.status(400).send({
          status_code: 400,
          message: 'An error occurred',
          error: err,
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



export const loadData = async (req, res, next) => {
  const { supplierID } = req.params;
  try {
      const productsQuery = `SELECT * FROM PRODUCT WHERE supplierId = ?`;
      const products = await queryAsync(productsQuery, [supplierID]);

      const topCustomersQuery = `
          SELECT U.userID, U.emailID, SUM(P.quantity) AS total_quantity_bought
          FROM USERS U
          JOIN PURCHASE P ON U.userID = P.userID
          JOIN PRODUCT PR ON P.productID = PR.productID
          JOIN SUPPLIER S ON PR.supplierID = S.supplierID
          WHERE S.supplierID = ?
          GROUP BY U.userID
          ORDER BY total_quantity_bought DESC
          LIMIT 10`;
      const topCustomers = await queryAsync(topCustomersQuery, [supplierID]);

      const supplierQuery = `SELECT * FROM SUPPLIER WHERE supplierId = ?`;

      const supplier = await queryAsync(supplierQuery, [supplierID]);
      console.log(supplier);

      const balance = await tokenBalance(supplier[0].supplierName);
      console.log(balance)

      res.status(200).send({
        message: 'Data Loaded',
        products,
        topCustomers,
        supplier,
        balance
      });

    }catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
};