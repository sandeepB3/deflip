import { db } from '../utils/db.js';
import bcrypt from 'bcrypt';
import util from 'util'
const promisify = util.promisify;
const queryAsync = promisify(db.query).bind(db);
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

        db.query(`SELECT * FROM SUPPLIER WHERE supplierName=?`, [supplierName], async (err, result) => {
        if (err) {
            console.error(err);
            res.status(400).send({
                code: 400,
                failed: 'error occurred',
                error: err,
            });
        } else {
            if (result && result[0]) {
                
                res.send({
                    status_code:200,
                    message:"Data Returned",
                    supplier: result[0],
                })
            }
        }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
};
export const loadData= async(req,res,next)=>{
    const {supplierID}=req.params
    try{
        const products=await queryAsync(`SELECT * FROM PRODUCT WHERE supplierId = ?`,[supplierID])
        const topCustomers=await queryAsync(`SELECT U.userID,U.emailID, SUM(P.quantity) AS total_quantity_bought
        FROM USERS U
        JOIN PURCHASE P ON U.userID = P.userID
        JOIN PRODUCT PR ON P.productID = PR.productID
        JOIN SUPPLIER S ON PR.supplierID = S.supplierID
        WHERE S.supplierID =?
        GROUP BY U.userID
        ORDER BY total_quantity_bought DESC
        LIMIT 10`,[supplierID])
        res.send({
            products,
            topCustomers
        })             
                
    }catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }

}
// export const getProducts  =async (req, res, next) => {
  
//     console.log(req.session.supplier)
//     try{
//         const supplierID  = req.body?.supplierID;
//         db.query(`SELECT * FROM PRODUCT WHERE supplierId = ?`,[supplierID], async (err, result) => {
//             if(err){
//                 console.error(err);
//                 res.status(400).send({
//                     code: 400,
//                     failed: 'error occurred',
//                     error: err,
//                 });
//             }else{
//                 if(result && result[0]){
//                     console.log(result);
//                     res.send({
//                         status_code:200,
//                         message:"Data Returned"
//                     })
//                 }
//             }
//         })
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).send('Internal server error');
//     }
// };

export const logoutSupplier = async (req, res, next) => {

    try {
        req.session.supplier=null
        res.status(201).send({
            message:"Logged out successfully"
        })
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
};
export const getTopCustomers=async(req,res)=>{
    const {supplierID}=req.params
    console.log(supplierID)
    db.query( `SELECT U.userID,U.emailID, SUM(P.quantity) AS total_quantity_bought
    FROM USERS U
    JOIN PURCHASE P ON U.userID = P.userID
    JOIN PRODUCT PR ON P.productID = PR.productID
    JOIN SUPPLIER S ON PR.supplierID = S.supplierID
    WHERE S.supplierID =?
    GROUP BY U.userID
    ORDER BY total_quantity_bought DESC
    LIMIT 10`,[supplierID],async(err,result)=>{
        if(result){
            res.send({
                result
                });
           
        }
        else{
            res.send({
                code: 400,
                failed: 'error occurred',
                error: err,
            });
        }
    })
}
export const checkAuth=async(req,res)=>{
if(req.session.supplier) return res.status(200).send({status:"Authenticated"})
else return res.status(401).send({status:"Invalid"})
}