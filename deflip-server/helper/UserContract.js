import { kartInstance, transaction } from '../utils/contract.js';

export const deployUserContract = async (username) => {

    try{
      const gasLimit = await kartInstance.methods.deployUserContract(username).estimateGas(); 
      transaction.gasLimit = gasLimit;

      const userContractDetails = await kartInstance.methods.deployUserContract(username).send(transaction);
      console.log(userContractDetails);
  
      const userAddress = await kartInstance.methods.deployedContracts(username).call();
      return userAddress;
      
    } catch(err){
      console.log(err);
      res.status(404).json({message: 'Error deploying user'});
    }
}

export const sendUserTokens = async (username, val) => {

  try{
    const gasLimit = await kartInstance.methods.transferToken(username, val).estimateGas(); 
    transaction.gasLimit = gasLimit;

    const transferDetails = await kartInstance.methods.transferToken(username, val).send(transaction);
    console.log(transferDetails);

    const tokens = await kartInstance.methods.checkBalance(username).call();
    return tokens.toString();
    
  } catch(err){
    console.log(err);
  }
};

export const sendAdminTokens = async (username, val) => {

  try{
    const gasLimit = await kartInstance.methods.transferBack(username, val).estimateGas(); 
    transaction.gasLimit = gasLimit;

    const transferDetails = await kartInstance.methods.transferBack(username, val).send(transaction);
    console.log(transferDetails);

    const tokens = await kartInstance.methods.transferBack(username).call();
    return tokens.toString();
    
  } catch(err){
    console.log(err);
  }
};