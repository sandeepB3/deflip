import { sendUserTokens, tokenBalance } from '../helper/UserContract.js';
import { db } from '../utils/db.js';
import { promisify } from 'util';
import { publishNotification } from './notification.con.js';
const queryAsync = promisify(db.query).bind(db);




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
      
      await publishNotification(`You just made a purchase of ${total} and were awarded ${tokens} for it!`,userID)
      
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
