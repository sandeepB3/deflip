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
      const updateSupplierQuery = 
      `UPDATE SUPPLIER
            SET unitSold = unitSold + ?,
            revenue = revenue + ?
            WHERE supplierID = ?`;
      const purchaseInsertQuery = `
              INSERT INTO PURCHASE(productID, userID, quantity, orderID, purchaseDate)
              VALUES (?, ?, ?, ?, ?)`;
      for (const item of items) {
          console.log(item)
          const updateProductParams = [item.quantity, item.productID];
          db.query(updateProductQuery, updateProductParams);

          const updateSupplierParams = [item.quantity,item.cost*item.quantity,item.seller];
          db.query(updateSupplierQuery,updateSupplierParams);
          
          const purchaseInsertParams = [item.productID, userID, item.quantity, orderInsertResult.insertId, currentDate];
          db.query(purchaseInsertQuery, purchaseInsertParams);
      }
      const result = await queryAsync(`SELECT emailID FROM USERS WHERE userID=?`,[userID])
      
      const tokens=total/100;
      const balance=await sendUserTokens(result[0].emailID,100)
    

      
      
      await publishNotification(`You just made a purchase of ${total} and were awarded ${tokens} chain tokens for it! Your current token balance is ${balance} chain tokens.`,userID)
      
      res.send({
          status: 'Purchase Added',
          status_code: 200,
          data:result,
          tokens: tokens
      });
      
  } catch (error) {
    console.log(error)
      res.status(500).send({
          failed: 'An error occurred',
          error: error
      });
  }
};
