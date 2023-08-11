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
