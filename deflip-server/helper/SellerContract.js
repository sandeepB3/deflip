import { kartInstance, transaction } from '../utils/contract.js';

export const deploySellerContract = async (supplierName) => {
    try{
      const gasLimit = await kartInstance.methods.deploySellerContract(supplierName).estimateGas(); 
      transaction.gasLimit = gasLimit;
  
      const supplierContractDetails = await kartInstance.methods.deploySellerContract(supplierName).send(transaction);
      console.log(supplierContractDetails);
  
      const sellerAddress = await kartInstance.methods.deployedContracts(supplierName).call();
      return sellerAddress;
      
    } catch(err){
      console.log(err);
    }
  
};

export const sendSupplierTokens = async (supplierName, val) => {

  try{
    const gasLimit = await kartInstance.methods.transferToken(supplierName, val).estimateGas(); 
    transaction.gasLimit = gasLimit;

    const transferDetails = await kartInstance.methods.transferToken(supplierName, val).send(transaction);
    console.log(transferDetails);

    const tokens = await kartInstance.methods.checkBalance(supplierName).call();
    return tokens.toString();
    
  } catch(err){
    console.log(err);
  }
};

export const sendTopCustomerTokens = async (req, res) => {

  try{
    const { supplier, customer, token } = req.body;

    const gasLimit = await kartInstance.methods.transferFromSeller(supplier, customer, token).estimateGas(); 
    transaction.gasLimit = gasLimit;

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

export const tokenBalance = async(supplierName) => {

  try{
    const tokens = await kartInstance.methods.checkBalance(supplierName).call();
    return tokens.toString();

  }catch(err){
    console.log(err);
  }
}