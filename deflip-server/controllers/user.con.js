import { db } from '../utils/db.js';
import bcrypt from 'bcrypt';
import { kartInstance, account, gasPrice } from '../utils/contract.js';

export const registerUser = async (req, res, next) => {
    try {
        const { emailID, password } = req.body;
        const saltRounds = 10;
        const encryptedPassword = await bcrypt.hash(password, saltRounds);

        //Web3 Call
        const [username, domain] = emailID.split('@');
        const userAddress = deployUserContract(username)
        console.log(userAddress)
    
        db.query(
            `INSERT INTO USERS(emailID, password,contractAdd) VALUES (?,?,?)`,
            [emailID, encryptedPassword, userAddress]
        );

        console.log('Account successfully created');
        res.send({
            status: 'Account successfully created',
            status_code: 200,
            data : userAddress
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
};

//Web 3 - User Deploy
const deployUserContract = async (username) => {

    try{
      const gasLimit = await kartInstance.methods.deployUserContract(username).estimateGas(); 
        
      const transaction = {
          from: account.address,
          to: process.env.KART_CONTRACT,
          gasPrice: gasPrice,
          gasLimit: gasLimit,
          value: 0
      };
  
      const userContractDetails = await kartInstance.methods.deployUserContract(username).send(transaction);
      console.log(userContractDetails);
  
      const userAddress = await kartInstance.methods.deployedContracts(username).call();
      return userAddress;
      
    } catch(err){
      console.log(err);
      res.status(404).json({message: 'Error deploying user'});
    }
}


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
                    req.session.user = result[0]
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


