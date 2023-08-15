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

    const sellerAddress = await deploySellerContract(supplierName);
    console.log(sellerAddress)

    const tokens = await sendSupplierToken(supplierName, 1000);
    console.log(tokens)

    db.query(
      `INSERT INTO SUPPLIER(supplierName, password, contractAdd) VALUES (?, ?, ?)`,
      [supplierName, encryptedPassword, sellerAddress]
    );

    console.log('Supplier Account successfully created');
    res.send({
        status: 'Supplier Account successfully created',
        status_code: 200,
        data: { sellerAddress, tokens}

    });

  } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
  }
};


const deploySellerContract = async (supplierName) => {
  try{
    const gasLimit = await kartInstance.methods.deploySellerContract(supplierName).estimateGas(); 
      
    const transaction = {
      from: account.address,
      to: process.env.KART_CONTRACT,
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      value: 0
    };

    const supplierContractDetails = await kartInstance.methods.deploySellerContract(supplierName).send(transaction);
    // console.log(supplierContractDetails);

    const sellerAddress = await kartInstance.methods.deployedContracts(supplierName).call();
    return sellerAddress;
    
  } catch(err){
    console.log(err);
  }

};

//Web 3 - Supplier Onboarding token 
const sendSupplierToken = async (supplierName, val) => {

  try{
    const gasLimit = await kartInstance.methods.transferToken(supplierName, val).estimateGas(); 
      
    const transaction = {
        from: account.address,
        to: process.env.KART_CONTRACT,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        value: 0
    };

    const transferDetails = await kartInstance.methods.transferToken(supplierName, val).send(transaction);
    // console.log(transferDetails);

    const tokens = await kartInstance.methods.checkBalance(supplierName).call();
    return tokens.toString();
    
  } catch(err){
    console.log(err);
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

export const sendTopCustomerTokens = async (req, res) => {

  try{
    const { supplier, customer, token } = req.body;

    const gasLimit = await kartInstance.methods.transferFromSeller(supplier, customer, token).estimateGas(); 
      
    const transaction = {
        from: account.address,
        to: process.env.KART_CONTRACT,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        value: 0
    };

    const transferDetails = await kartInstance.methods.transferFromSeller(supplier, customer, token).send(transaction);
    console.log(transferDetails);

    const supplierTokens = await kartInstance.methods.checkBalance(supplier).call();
    const userTokens = await kartInstance.methods.checkBalance(customer).call();  

    console.log('Tokens transfered successfully');
    res.send({
      status: 'Tokens transfered successfully',
      status_code: 200,
      data: { supplierTokens: supplierTokens.toString(), userTokens: userTokens.toString() }
    });

  }catch(err){
    console.error(err);
    res.status(500).send('Internal server error');
  }
};