// SPDX-License-Identifier: MIT
pragma solidity >=0.4.17 <=0.8.6;

contract Voting {

  uint addressId=0;

  mapping(uint => address) ethAddressMapping;

  function registerVoter(address ethAddress) public {
      ethAddressMapping[addressId] = ethAddress;
      addressId+=1;
  } 
}
