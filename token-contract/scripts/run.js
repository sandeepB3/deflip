const main = async () => {

  const [admin] = await hre.ethers.getSigners();

  //ChainToken
  const tokenContractFactory = await hre.ethers.getContractFactory("ChainToken");
  const tokenContract = await tokenContractFactory.deploy("Chain Token", "CT");
  await tokenContract.deployed();
  
  console.log("\nToken Contract deployed to:", tokenContract.address);
  console.log("Token Contract deployed by:", await tokenContract.admin());

  const adminBalance = await tokenContract.balanceOf(admin.address);
  console.log("\nAdmin Balance: %s", adminBalance);

  //ChainKart
  const kartContractFactory = await hre.ethers.getContractFactory("ChainKart");
  const kartContract = await kartContractFactory.deploy(tokenContract.address);
  await kartContract.deployed();

  console.log("Kart Contract deployed to:", kartContract.address);
  console.log("Kart Contract deployed by:", admin.address);

  const contractOwnerAddress = await kartContract.deployedContracts("contractOwner");
  console.log("\nAddress of contract owner: %s", contractOwnerAddress);
  
  await kartContract.deployUserContract("sandeep");
  const userAddress = await kartContract.deployedContracts("sandeep");
  console.log("\nAddress of user: %s", userAddress);
  // console.log("\nAddress of user: %s", userAddress);

  await kartContract.deploySellerContract("maple store");
  const sellerAddress = await kartContract.deployedContracts("maple store");
  console.log("\nAddress of seller: %s", sellerAddress);
  ///////////////////////////////////////////////////////////////////////
  
  await kartContract.transferToken("sandeep", 30);
  let userBalance = await kartContract.checkBalance("sandeep");
  console.log("\nBalance of user: %s", userBalance);

  await kartContract.transferToken("maple store", 100);
  let sellerBalance = await kartContract.checkBalance("maple store"); 
  console.log("Balance of seller: %s", sellerBalance);

  await kartContract.transferFromSeller("maple store", "sandeep", 30);
  userBalance = await kartContract.checkBalance("sandeep");
  console.log("\nNew Balance of user: %s", userBalance);
  sellerBalance = await kartContract.checkBalance("maple store");
  console.log("New Balance of seller: %s", sellerBalance);

  await kartContract.transferBack("sandeep", 55);
  userBalance = await kartContract.checkBalance("sandeep");
  console.log("\nAfter spending Balance of user: %s", userBalance);

};

const runMain = async () => {
  try {
      await main();
      process.exit(0);
  } catch (error) {
      console.log(error);
      process.exit(1);
  }
};

runMain();