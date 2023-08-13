import { db } from '../utils/db.js';
import bcrypt from 'bcrypt';

export const addSupplier = async (req, res, next) => {
    try {
        const { supplierName, password } = req.body;
        const saltRounds = 10;
        const encryptedPassword = await bcrypt.hash(password, saltRounds);
        await db.query(
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
            res.status(400).send({
                code: 400,
                failed: 'error occurred',
                error: err,
            });
        } else {
            if (result1 && result1[0]) {
                console.log(result1[0])
                const comparison = await bcrypt.compare(password, result1[0].password);
                if (comparison) {
                    req.session.supplier=result1[0]
                    db.query(`SELECT * FROM PRODUCT WHERE supplierId = ?`,[result1[0].supplierID], async (err, result2) => {
                        if(err){
                            console.error(err);
                            res.status(400).send({
                                code: 400,
                                failed: 'error occurred',
                                error: err,
                            });
                        }else{
                            if(result2){
                                console.log(result2);
                                res.send({
                                    status_code:200,
                                    message:"Data Returned",
                                    supplier: result1[0],
                                    products:result2
                                })
                            }
                        }
                    })
                } else {
                    res.send({
                        message: 'Auth Decline',
                        status_code: 401,
                        supplier: {},
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

export const getProducts  =async (req, res, next) => {
  
    console.log(req.session)
    try{
        const supplierID  = req.body?.supplierID;
        db.query(`SELECT * FROM PRODUCT WHERE supplierId = ?`,[supplierID], async (err, result) => {
            if(err){
                console.error(err);
                res.status(400).send({
                    code: 400,
                    failed: 'error occurred',
                    error: err,
                });
            }else{
                if(result && result[0]){
                    console.log(result);
                    res.send({
                        status_code:200,
                        message:"Data Returned"
                    })
                }
            }
        })
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal server error');
    }
};

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