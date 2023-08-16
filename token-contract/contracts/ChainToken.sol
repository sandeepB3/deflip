// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import "hardhat/console.sol";

contract ChainToken {
  string public name;
  string public symbol;
  uint8 immutable decimals = 18;
  uint256 public immutable totalSupply = 1000000;
  address public admin;
  mapping(address => uint256) public balances;

  event Transfer(address indexed _from, address indexed _to, uint256 _value);
  event Mint(string _name, string _symbol);

  constructor(string memory _name, string memory _symbol) {
    admin = msg.sender;
    mint(_name, _symbol);
  }

  function mint(string memory _name, string memory _symbol) internal {
    name = _name;
    symbol = _symbol;
    balances[admin] = totalSupply;
    emit Mint(_name, _symbol);
  }

  function balanceOf(address _owner) public view returns(uint256) {
    require(_owner != address(0), "Not a Token Owner");
    return balances[_owner];
  }

  function transfer(address _from, address _to, uint256 _value) public returns(bool) {
    require(balances[_from] >= _value, "Insufficient Balance");
    balances[_from] -= _value;
    balances[_to] += _value;
    emit Transfer(_from, _to, _value);
    return true;
  }
}