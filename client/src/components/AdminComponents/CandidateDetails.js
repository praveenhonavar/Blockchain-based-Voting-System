import React, { Component } from "react";
import AdminSideBar from "./AdminSideBar";
import "../../styles/CandidateDetails.css";

import getWeb3 from "../../getWeb3";
import VotingContract from "../../contracts/Voting.json";

const pd = () => {
  console.log("oooooooooooooooooooooooo");
  if (!window.location.hash) {
    window.location = window.location + "#loaded";
    window.location.reload();
  }
};

var candId, vc;

var dict={}

class CandidateDetails extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      console.log(accounts);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = VotingContract.networks[networkId];
      const instance = new web3.eth.Contract(
        VotingContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    var transactions = document.getElementById("Transactions");

    contract
      .getPastEvents("Voted", {
        fromBlock: 0,
        toBlock: "latest",
      })
      .then((pd) => {
        console.log("pdddddddddddd", pd);
        pd.map((res)=>{
          candId = res.returnValues.candidateId;
            vc =   res.returnValues.voteCount;
            dict[candId] = vc
        })
      

  
        console.log("ddd",dict);
        // var size = pd.length;
        // console.log(size);

        // for (var i = size - 1; i >= 0; i--) {
        //   // console.log(val[i].returnValues);

        //   // var name = kp[i].returnValues.name;
        //   // var age = kp[i].returnValues.age;
        //   // var party = kp[i].returnValues.party;
        //   // var experince = kp[i].returnValues.experince;
        //   var voteCount = pd[i].returnValues.voteCount;
        //   noVotes[i] = voteCount;

        // }
      });

    contract
      .getPastEvents("AddedCandidate", {
        fromBlock: 0,
        toBlock: "latest",
      })
      .then((kp) => {
        console.log(kp);

        var size = kp.length;
        console.log(size);

        for (var i = size - 1; i >= 0; i--) {
          // console.log(val[i].returnValues);
          var cid = kp[i].returnValues.id;
          var name = kp[i].returnValues.name;
          var age = kp[i].returnValues.age;
          var party = kp[i].returnValues.party;
          var experince = kp[i].returnValues.experince;

          var voteCount = dict[cid]
      


          // var voteCount = noVotes[i];

          transactions.innerHTML += `<tbody>
                <tr>
                  <td data-column="First Name">${name}</td>
                  <td data-column="Twitter">${party}</td>
                  <td data-column="Twitter">${experince}</td>
                  <td data-column="Last Name">${age}</td>
                  <td data-column="Job Title">${voteCount}</td>
                </tr>   
              </tbody>`;

          // transactions.innerHTML+=

          // `<table border='1px' style="margin-left:15em">
          // <tr><td>${projectName}&nbsp&nbsp</td>
          // <td>${fundingAmount}&nbsp&nbsp</td>
          // <td>${receiverGovtBodyName}&nbsp&nbsp</td>
          // </tr>
          // </table>`

          console.log("Name -->", name);
          console.log("age-->", age);
          console.log("party-->", party);
          console.log("-------------------------------------------");
        }
      });

    // var addVoterBtn = document.getElementById("add-voter");
    // var ethAddress = document.getElementById("eth-address");
    // addVoterBtn.addEventListener("click", () => {
    //   var ethAddressValue = ethAddress.value;
    //   console.log("meee", ethAddressValue);
    //   // console.log(contract.methods);
    //   contract.methods
    //     .registerVoter(ethAddressValue)
    //     .send({
    //       from: accounts[0],
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       console.log("added");
    //     });
    // });
    // Stores a given value, 5 by default.
    //   await contract.methods.set(5).send({ from: accounts[0] });
    // Get the value from the contract to prove it worked.
    //   const response = await contract.methods.get().call();
    // Update state with the result.
    //   this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      pd();

      console.log("pkfpefpef");
      // window.location.reload()

      // return <div>Loading Web3, accounts, and contract...</div>;
    }

    // if (!this.state.web3) {

    //   const  pd = async () => {
    //     try {
    //       // Get network provider and web3 instance.
    //       const web3 = await getWeb3();

    //       // Use web3 to get the user's accounts.
    //       const accounts = await web3.eth.getAccounts();

    //       console.log(accounts);

    //       // Get the contract instance.
    //       const networkId = await web3.eth.net.getId();
    //       const deployedNetwork = VotingContract.networks[networkId];
    //       const instance = new web3.eth.Contract(
    //         VotingContract.abi,
    //         deployedNetwork && deployedNetwork.address
    //       );

    //       // Set web3, accounts, and contract to the state, and then proceed with an
    //       // example of interacting with the contract's methods.
    //       this.setState({ web3, accounts, contract: instance }, this.runExample);
    //     } catch (error) {
    //       // Catch any errors for any of the above operations.
    //       alert(
    //         `Failed to load web3, accounts, or contract. Check console for details.`
    //       );
    //       console.error(error);
    //     }
    //   };

    // }
    return (
      <div className="validate-voter-page">
        <AdminSideBar />
        <h1>Candidate Details</h1>

        <table id="Transactions">
          <thead>
            <tr>
              <th>Candidate Name</th>
              <th>Candidate Party</th>
              <th>Candidate Experience</th>
              <th>Candidate Age</th>
              <th>Number of Votes</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

export default CandidateDetails;
