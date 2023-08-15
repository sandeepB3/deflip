import { db } from '../utils/db.js';
import bcrypt from 'bcrypt';

export const addSupplier = async (req, res, next) => {
    try {
        const { supplierName, password } = req.body;
        const saltRounds = 10;
        const encryptedPassword = await bcrypt.hash(password, saltRounds);
        db.query(
            `INSERT INTO SUPPLIER(supplierName, password) VALUES (?, ?)`,
            [supplierName, encryptedPassword]
        );

        console.log('Supplier Account successfully created');
        res.send({
            status: 'Supplier Account successfully created',
            status_code: 200,
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
};


export const loginSupplier = async (req, res, next) => {
  try {
    const { supplierName, password } = req.body;

    db.query(`SELECT * FROM SUPPLIER WHERE supplierName=?`, [supplierName], async (err, result1) => {
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
          req.session.supplier = result1[0];
          console.log(req.session);

          db.query(`SELECT * FROM PRODUCT WHERE supplierId = ?`, [result1[0].supplierID], async (err, result2) => {
            if (err) {
              console.error(err);
              return res.status(400).send({
                status_code: 400,
                message: 'An error occurred',
                error: err,
              });
            }

            if (result2) {
              res.send({
                status_code: 200,
                message: 'Data Returned',
                supplier: result1[0],
                products: result2,
              });
            }
          });
        } else {
          res.send({
            message: 'Authentication Declined',
            status_code: 401,
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
    req.session.supplier = null;
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


export const checkAuth = async (req, res) => {
  try {
    if (req.session.supplier) {
      return res.status(200).send({ status: "Authenticated" });
    } else {
      return res.status(401).send({ status: "Invalid" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status_code: 500,
      message: "Internal server error",
      error: err,
    });
  }
};
