const main = async () => {
  const coinContractFactory = await hre.ethers.getContractFactory('Coins');
  const coinContract = await coinContractFactory.deploy();
  await coinContract.deployed();
  
  console.log("Contract deployed to:", coinContract.address);
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