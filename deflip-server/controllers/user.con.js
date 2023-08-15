import { db } from '../utils/db.js';
import bcrypt from 'bcrypt';
import util from 'util'
const promisify = util.promisify;
const queryAsync = promisify(db.query).bind(db);

export const registerUser = async (req, res, next) => {
    try {
        const { emailID, password } = req.body;
        const saltRounds = 10;
        const encryptedPassword = await bcrypt.hash(password, saltRounds);

        db.query(
            `INSERT INTO USERS(emailID, password) VALUES (?, ?)`,
            [emailID, encryptedPassword]
        );

        console.log('Admin Account successfully created');
        res.send({
            status: 'Admin Account successfully created',
            status_code: 200,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
};


export const loginUser = async (req, res, next) => {
    try {
        const { emailID, password } = req.body;

        db.query(`SELECT password FROM USERS WHERE emailID=?`, [emailID], async (err, result) => {
        if (err) {
            console.error(err);
            res.status(400).send({
                code: 400,
                failed: 'error occurred',
                error: err,
            });
        } else {
            if (result && result[0]) {
                const comparison = await bcrypt.compare(password, result[0].password);
                if (comparison) {
                    req.session.user=result[0]
                    res.send({
                    status: 'Login successful',
                    status_code: 200,
                    user_id: result[0].userID,
                    });
                } else {
                    res.send({
                    status: 'Login declined',
                    });
                }
            }
        }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
};


export const getOrders=async(req,res,next)=>{
try{
    const {userID}=req.params
    const orders=await queryAsync(`SELECT * FROM ORDERS WHERE userID=?`,[userID])
    res.status(200).send({
        orders
    })
}catch(e){
    res.status(500).send('Internal server error');
}
}

export const getPurchasedItems=async(req,res,next)=>{
    try{
        const {orderID}=req.params
        const items=await queryAsync(`SELECT
        P.productName,
        P.imgURL,
        P.brandName,
        PU.quantity
    FROM
        PURCHASE PU
    JOIN
        PRODUCT P ON PU.productID = P.productID
    WHERE
        PU.orderID = ?`,[orderID])
        res.status(200).send({
            items
        })
    }catch(e){
        res.status(500).send('Internal server error');
    }
    }