import dotenv from 'dotenv'
dotenv.config()

import Web3 from 'web3';
const web3 = new Web3("http://127.0.0.1:8545/"); // const web3 = new Web3(process.env.QuickNode_URL);
import KartABI from './contractABI/ChainKart.json' assert { type: "json" };
import TokenABI from './contractABI/ChainToken.json' assert { type: "json" };
import SellerABI from './contractABI/SellerContract.json' assert { type: "json" };
import UserABI from './contractABI/UserContract.json' assert { type: "json" };

const kartContractABI = KartABI.abi;
const tokenContractABI = TokenABI.abi;
const sellerContractABI = SellerABI.abi;
const userContractABI = UserABI.abi;

const tokenContractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const kartContractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

let userContractAddress = ''; //Function to retrive
let sellerContractAddress = ''; //Function to retrive

const PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

const kartInstance = new web3.eth.Contract(kartContractABI, kartContractAddress);
const tokenInstance = new web3.eth.Contract(tokenContractABI, tokenContractAddress);
const userInstance = new web3.eth.Contract(userContractABI, userContractAddress);
const sellerInstance = new web3.eth.Contract(sellerContractABI, sellerContractAddress);

let gasPrice;

async function getGas(){
    try{
        gasPrice = await web3.eth.getGasPrice(); 
    }catch(err){
        console.log(err);
    }
}
getGas();

export {kartInstance, tokenInstance, userInstance, sellerInstance, account, gasPrice};