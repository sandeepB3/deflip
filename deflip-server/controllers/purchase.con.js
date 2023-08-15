import { db } from '../utils/db.js';

export const makePurchase = async (req, res, next) => {
  try {
    const { productID, userID, quantity } = req.body;
    console.log(req.body);

    db.query(`INSERT INTO PURCHASE(productID, userID, quantity) VALUES (?,?,?)`, [productID, userID, quantity], async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(400).send({
          status_code: 400,
          message: 'An error occurred',
          error: err,
        });
      } else {
        res.status(200).send({
          status: 'Purchase Added',
          status_code: 200,
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
