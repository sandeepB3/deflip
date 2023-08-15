const main = async () => {
    
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
    console.log("Account balance of deployer: ", accountBalance.toString());

    //ChainToken
    const tokenContractFactory = await hre.ethers.getContractFactory("ChainToken");
    const tokenContract = await tokenContractFactory.deploy("Chain Token", "CT");
    await tokenContract.deployed();
    console.log("\nToken Contract deployed to:", tokenContract.address);
    console.log("Token Contract deployed by:", await tokenContract.admin());

    //ChainKart
    const kartContractFactory = await hre.ethers.getContractFactory("ChainKart");
    const kartContract = await kartContractFactory.deploy(tokenContract.address);
    await kartContract.deployed();
    console.log("\nKart Contract deployed to:", kartContract.address);
    console.log("Kart Contract deployed by:", await kartContract.admin());

    //Tokens with Admin
    const admin = await tokenContract.admin();
    const adminBalance = await tokenContract.balanceOf(admin);
    console.log("\nAdmin Token Balance: %s", adminBalance);

}

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