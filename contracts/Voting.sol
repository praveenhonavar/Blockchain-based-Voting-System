// SPDX-License-Identifier: MIT
pragma solidity >=0.4.17 <=0.8.6;

contract Voting {
    uint256 addressId = 0;
    uint256 candidateId = 0;

    struct Candidate {
        string name;
        string party;
        string experince;
        uint256 age;
        uint256 voteCount;
    }

    event AddedCandidate(
        string name,
        string party,
        string experince,
        uint256 age,
        uint256 voteCount
    );

    mapping(uint256 => Candidate) CandidateMapping;

    mapping(uint256 => address) ethAddressMapping;

    function registerVoter(address ethAddress) public {
        ethAddressMapping[addressId] = ethAddress;
        addressId += 1;
    }

    function addCandidate(
        string memory name,
        string memory party,
        string memory experince,
        uint256 age,
        uint256 voteCount
    ) public {
        CandidateMapping[candidateId].name = name;
        CandidateMapping[candidateId].party = party;
        CandidateMapping[candidateId].experince = experince;
        CandidateMapping[candidateId].age = age;
        CandidateMapping[candidateId].voteCount = 0;

        emit AddedCandidate(name, party, experince, age, voteCount);
    }
}
