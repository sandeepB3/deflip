import { db } from '../utils/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
const queryAsync = promisify(db.query).bind(db);
import { deployUserContract, sendAdminTokens, tokenBalance  } from '../helper/UserContract.js';
import cron from 'node-cron';

export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, phone, email, password } = req.body;
        const saltRounds = 10;
        const encryptedPassword = await bcrypt.hash(password, saltRounds);

        //Web3 Call
        const [username, domain] = email.split('@');
        const userAddress = await deployUserContract(username)
        console.log(userAddress)

        
        const result = await queryAsync(
            `INSERT INTO USERS(firstName, lastName, phNO, emailID, password, contractAdd) VALUES (?,?,?,?,?,?)`,
            [firstName, lastName, phone, email, encryptedPassword, userAddress]
        );

        const tokens = await tokenBalance(email);

        // cron.schedule('*/15 * * * *', async () => await sendAdminTokens(email, 10));

        const user = {
            user_id: result.insertId,
            name: firstName + " " + lastName,
            phone: phone,
            email: email,
            contract: userAddress,
            balance: tokens
        }

        const accessToken = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: process.env.AT_EXP });

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            maxAge: parseInt(process.env.AT_EXP) * 1000,
        });
        
        console.log('Account successfully created');
        res.send({
            status: 'Account successfully created',
            status_code: 200,
            user: user,
            token: accessToken,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
};


export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        db.query(`SELECT * FROM USERS WHERE emailID=?`, [email], async (err, result) => {
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
                    

                    const tokens = await tokenBalance(email);

                    const user = {
                        user_id: result[0].userID,
                        name: result[0].firstName + " " + result[0].lastName,
                        phone: result[0].phNO,
                        email: result[0].emailID,
                        contract: result[0].contractAdd,
                        balance: tokens
                    }

                    const accessToken = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: process.env.AT_EXP });
                    
                    res.cookie('access_token', accessToken, {
                        httpOnly: true,
                        maxAge: parseInt(process.env.AT_EXP) * 1000,
                    });

                    res.send({
                        status: 'Login successful',
                        status_code: 200,
                        user: user,
                        token: accessToken,
                    });

                } else {
                    res.send({
                        status: 'Login declined',
                        status_code: 200,
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


export const getProfile = async (req, res) => {
    const email = req.user.user.email;
    console.log("Server log : ",req.user)
    const tokens = await tokenBalance(email);
    req.user.user.balance = tokens
    console.log(tokens)
    res.status(200).send({ 
      message: 'This is a protected route', 
      data: req.user, 
      tokens
    });
}

export const getOrders = async (req, res, next) => {
    try {
        const { userID } = req.params;
        const ordersQuery = `SELECT * FROM ORDERS WHERE userID = ? ORDER BY orderDate DESC`;
        const orders = await queryAsync(ordersQuery, [userID]);
        
        res.status(200).send({
            message: 'Fetched all orders placed by user', 
            orders: orders
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

export const getPurchasedItems = async (req, res, next) => {
    try {
        const { orderID } = req.params;
        const itemsQuery = `
            SELECT P.productName, P.imgURL, P.brandName, PU.quantity
            FROM PURCHASE PU
            JOIN PRODUCT P ON PU.productID = P.productID
            WHERE PU.orderID = ?`;
        
        const items = await queryAsync(itemsQuery, [orderID]);

        res.status(200).send({
            message: 'Fetched purchased item by user', 
            items: items
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};
