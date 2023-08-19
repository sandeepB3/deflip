import { db } from "../utils/db.js"
import { v4 as uuidv4 } from 'uuid';
import {nanoid} from 'nanoid'
import { sendAdminTokens,tokenBalance } from "../helper/UserContract.js";
import { promisify } from 'util';
const queryAsync = promisify(db.query).bind(db);


export const createCoupon = async (req, res) => {
    try{
    const {cost,brand,offer,type,limit,incentive}=req.body
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1);
    const id=uuidv4()
    console.log(id)
    db.query('INSERT INTO COUPONS (cost,brand,expiry,offer,code,type,incentive,min_total) VALUES(?,?,?,?,?,?,?,?)', [cost,brand,expiryDate,offer,nanoid(11),type,incentive,limit])
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
    const {couponID, userID, username,cost}=req.body
    const balance = await tokenBalance(username)
    console.log("Balance",balance)
    if(balance < cost) {
        console.log("Insufficient Balance")
        return res.status(401).send({"message":"Insufficient Balance"})
    }
    await sendAdminTokens(username, cost)
    db.query('INSERT INTO COUPONS_MAP (couponID,userID) VALUES(?, ?)', [couponID, userID])
    res.status(200).send({
        message:"Coupon unlocked successfully"
    })
    }catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
    
}
export const fetchLockedCoupons = async (req, res) => {
    try {
        const { userID} = req.params;
        const query = `
        SELECT c.*
        FROM COUPONS c
        LEFT JOIN COUPONS_MAP cm ON c.couponID = cm.couponID AND cm.userID = ?
        WHERE c.type = ?
          AND cm.couponID IS NULL
          AND (c.expiry IS NULL OR c.expiry > NOW());
        `;
        
        const brandCoupons=await queryAsync(query, [userID,"brand"])
        const instoreCoupons=await queryAsync(query, [userID,"instore"])
        
        res.status(200).send({
            "message":"Coupons fetched successfully.",
            brandCoupons,
            instoreCoupons
        })
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
      }
    
}
export const fetchUnlockedCoupons = async (req, res) => {

    try {
        const { userID} = req.params;
        const query = `
        SELECT c.*
FROM COUPONS c
JOIN COUPONS_MAP cm ON c.couponID = cm.couponID AND cm.userID = ?
WHERE c.type = ?
  AND (c.expiry IS NULL OR c.expiry > NOW());
        `;
        
        const instoreCoupons=await queryAsync(query, [userID,"instore"])
        const brandCoupons=await queryAsync(query, [userID,"brand"])
        
        res.status(200).send({
            "message":"Coupons fetched successfully.",
            brandCoupons,
            instoreCoupons
        })
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
      }
    
}




export const validateCoupon = async (req, res) => {

    try {
        const { code,userID} = req.body;
        const query = `
        SELECT c.*
FROM COUPONS c
JOIN COUPONS_MAP cm ON c.couponID = cm.couponID AND cm.userID = ?
WHERE c.code = ?
AND c.type='instore' AND (c.expiry IS NULL OR c.expiry > NOW());`;
        
        const coupon=await queryAsync(query, [userID,code])
        // if(coupon[0])
        //     await queryAsync(`DELETE FROM COUPONS_MAP WHERE userID = ? AND couponID = ?; UPDATE COUPONS SET code = ? WHERE couponID =?;`,[userID,coupon[0].couponID,nanoid(),coupon[0].couponID])

        if(coupon[0]){
            return res.status(200).send({
            "message":"Coupons validated",
            "coupon":coupon[0]
        })
    }
    res.status(200).send({
        "message":"Invalid Coupon",
        
    })
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
      }
    
}