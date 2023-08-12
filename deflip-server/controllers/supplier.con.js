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
                console.log(result)
                const comparison = await bcrypt.compare(password, result[0].password);
                if (comparison) {
                    req.session.supplier=result[0]
                    res.send({
                    status: 'Login successful',
                    status_code: 200,
                    supplier: result[0],
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