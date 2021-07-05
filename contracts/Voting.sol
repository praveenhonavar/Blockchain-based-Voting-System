// SPDX-License-Identifier: MIT
pragma solidity >=0.4.17 <=0.8.6;

contract Voting {
    
    uint256 candidateId = 1;
    uint phaseId=0;
    
    struct Voter {
        address ethAddress;
        bool registered;
    }
    
    struct Candidate {
        uint id;
        string name;
        string party;
        string experince;
        uint256 age;
        uint256 voteCount;
    }

      event AddedCandidate(
        uint id,
        string name,
        string party,
        string experince,
        uint256 age,
        uint256 voteCount
    );

    event Voted(
        uint voteCount,
        address voter,
        uint candidateId
    );

    mapping(uint256 => Candidate) CandidateMapping;

    mapping(address => Voter) voterMapping;

    function registerVoter(address ethAddress) public {
        voterMapping[ethAddress].ethAddress = ethAddress;
        voterMapping[ethAddress].registered = true;
    }

    function addCandidate(
        string memory name,
        string memory party,
        string memory experince,
        uint256 age,
        uint256 voteCount
    ) public {
        CandidateMapping[candidateId].id=candidateId;
        CandidateMapping[candidateId].name = name;
        CandidateMapping[candidateId].party = party;
        CandidateMapping[candidateId].experince = experince;
        CandidateMapping[candidateId].age = age;
        CandidateMapping[candidateId].voteCount = 0;

        emit AddedCandidate(candidateId,name, party, experince, age, voteCount);

        candidateId+=1;

    }
    
    function changePhase(uint pId) public {
        phaseId=pId;
    }
    
    function castVote(uint cid) public{
        // require(voterMapping[msg.sender].registered);
        // require(cid<=candidateId && cid>=0);
        // require(phaseId==1);
        CandidateMapping[cid].voteCount+=1;

        emit Voted(CandidateMapping[cid].voteCount,msg.sender,cid);
        
        // voterMapping[msg.sender].registered=false;
    }
     
}
