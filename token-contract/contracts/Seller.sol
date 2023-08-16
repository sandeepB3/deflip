// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./ChainToken.sol";

contract SellerContract {
    string public username;
    address public admin;
    ChainToken public token;

    constructor(string memory _username, address _admin, address chainToken) {
        username = _username;
        admin = _admin;
        token = ChainToken(chainToken);
    }

    function transferTokensToAdmin(uint256 amount) external {
        token.transfer(address(this), admin, amount);
    }

    function transferTokensToUser(address user,uint256 amount) external {
        token.transfer(address(this), user, amount);
    }

    function balanceOfSeller() public view returns(uint256) {
        return token.balanceOf(address(this));
    }

}