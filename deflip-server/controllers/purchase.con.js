import { sendUserTokens, tokenBalance } from '../helper/UserContract.js';
import { db } from '../utils/db.js';
import { promisify } from 'util';

const queryAsync = promisify(db.query).bind(db);

// export const makePurchase = async (req, res) => {
//   try {
//     const { productID, userID, quantity } = req.body;
//     console.log(req.body);

//     db.query(`INSERT INTO PURCHASE(productID, userID, quantity) VALUES (?,?,?)`, [productID, userID, quantity], async (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(400).send({
//           status_code: 400,
//           message: 'An error occurred',
//           error: err,
//         });
//       } else {
//         res.status(200).send({
//           status: 'Purchase Added',
//           status_code: 200,
//         });
//       }
//     });
//   }catch (err) {
//     console.error(err);
//     res.status(500).send({
//       status_code: 500,
//       message: 'Internal server error',
//       error: err,
//     });
//   }
// };


export const purchaseCart = async (req, res) => {
  try {
      console.log("hi")
      const { items, total, userID } = req.body;
      const currentDate = new Date();

      const orderInsertQuery = `INSERT INTO ORDERS(userID, total, orderDate) VALUES (?, ?, ?)`;
      const orderInsertParams = [userID, total, currentDate];
      const orderInsertResult = await queryAsync(orderInsertQuery, orderInsertParams);

      console.log(orderInsertResult.insertId);

      const updateProductQuery = `
      UPDATE PRODUCT
      SET quantity = quantity - ?
      WHERE productID = ?`;
      const purchaseInsertQuery = `
              INSERT INTO PURCHASE(productID, userID, quantity, orderID, purchaseDate)
              VALUES (?, ?, ?, ?, ?)`;
      for (const item of items) {
          
          const updateProductParams = [item.quantity, item.productID];
          db.query(updateProductQuery, updateProductParams);

          
          const purchaseInsertParams = [item.productID, userID, item.quantity, orderInsertResult.insertId, currentDate];
          db.query(purchaseInsertQuery, purchaseInsertParams);
      }
      const result = await queryAsync(`SELECT emailID FROM USERS WHERE userID=?`,[userID])
      console.log(result[0].emailID)
      const balance = await tokenBalance(result[0].emailID)
      console.log(balance)

      const tokens = await sendUserTokens(result[0].emailID, 100)
      console.log(tokens)

      balance = await tokenBalance(result[0].emailID)
      console.log(balance)

      res.send({
          status: 'Purchase Added',
          status_code: 200,
          data:result,
          tokens: tokens
      });
      
  } catch (error) {
      res.status(500).send({
          failed: 'An error occurred',
          error: error
      });
  }
};
