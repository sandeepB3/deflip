// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import "hardhat/console.sol";

import "./ChainToken.sol";
import "./User.sol";
import "./Seller.sol";

contract ChainKart {
    address public admin;
    address tokenContract;
    mapping(string => address) public deployedContracts;
    ChainToken public token;

    constructor(address _tokenContract) {
        tokenContract = _tokenContract;
        token = ChainToken(_tokenContract);
        admin = msg.sender;
        deployedContracts["contractOwner"] = admin;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }

    function deployUserContract(string memory username) external onlyAdmin {
        require(deployedContracts[username] == address(0), "Contract already exists for this user");
        UserContract newUserContract = new UserContract(username, msg.sender, tokenContract);
        deployedContracts[username] = address(newUserContract);
    }

    function deploySellerContract(string memory username) external onlyAdmin {
        require(deployedContracts[username] == address(0), "Contract already exists for this seller");
        SellerContract newSellerContract = new SellerContract(username, msg.sender, tokenContract);
        deployedContracts[username] = address(newSellerContract);
    }

    function transferToken(string memory username, uint256 _value) external onlyAdmin {
        require(token.balances(admin) >= _value, "Insufficient Balance");
        address user = deployedContracts[username];
        token.transfer(admin, user, _value);
    }

    function transferBack(string memory username, uint256 _value) external onlyAdmin {
        require(checkBalance(username) >= _value, "Insufficient Balance");
        address user = deployedContracts[username];
        token.transfer(user, admin, _value);
    }

    function transferFromSeller(string memory _seller, string memory _user, uint256 _value) external onlyAdmin {
        require(checkBalance(_seller) >= _value, "Insufficient Balance");
        address user = deployedContracts[_user];
        address seller = deployedContracts[_seller];
        token.transfer(seller, user, _value);
    }

    function checkBalance(string memory username) public view returns(uint256) {
        uint256 balance = token.balanceOf(deployedContracts[username]);
        return balance;
    }

}
