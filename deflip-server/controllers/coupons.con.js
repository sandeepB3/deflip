import { db } from "../utils/db.js"
import { v4 as uuidv4 } from 'uuid';
import { sendAdminTokens,tokenBalance } from "../helper/UserContract.js";
export const createCoupon = async (req, res) => {
    try{
    const {cost,brand,offer}=req.body
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1);
    const id=uuidv4()
    console.log(id)
    db.query('INSERT INTO COUPONS (cost,brand,expiry,offer,code) VALUES(?, ?,?,?,?)', [cost,brand,expiryDate,offer,uuidv4()])
    res.status(200).send({
        message:"Coupon added successfully"
    })
    }catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }  
}
export const unlockCoupon = async (req, res) => {
    try{
    const {couponID,userID,username,cost}=req.body
    const balance=tokenBalance(username)
    if(balance<cost) return res.status(401).send({"message":"Insufficient Balance"})
    sendAdminTokens(username,cost)
    db.query('INSERT INTO COUPONS_MAP (couponID,userID) VALUES(?, ?)', [couponID,userID])
    res.status(200).send({
        message:"Coupon unlocked successfully"
    })
    }catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
    
}
export const fetchCoupons = async (req, res) => {

    try {
        const { userID } = req.params;
        const query = `
          SELECT c.*
          FROM COUPONS c
          LEFT JOIN COUPONS_MAP cm ON c.couponID = cm.couponID AND cm.userID = ?
          WHERE cm.couponID IS NULL AND (c.expiry IS NULL OR c.expiry > NOW())
        `;
        
        db.query(query, [userID],async(err,result)=>{
            if(err){
                return res.status(500).send('Error fetching data');
            }
            else{
                res.status(200).send({
                    message: "Coupon unlocked successfully",
                    coupons: result
                  });
            }
        })
        
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
      }
    
}