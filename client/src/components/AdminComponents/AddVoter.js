import React, { Component } from "react";
import getWeb3 from "../../getWeb3";
import VotingContract from "../../contracts/Voting.json";

import AdminSideBar from "./AdminSideBar";
import "../../styles/AddVoter.css";

import Swal from "sweetalert2/dist/sweetalert2.js";

let voters = {
  v1: {
    mail: "blockbook1109@gmail.com",
    name: "pd",
  },
  v2: {
    mail: "spktech606@gmail.com",
    name: "pd",
  },

  v3: {
    mail: "abcd@gmail.com",
    name: "pd",
  },
};

let voterIdKey = Object.keys(voters);

var ch;
var c=1;

console.log(voterIdKey);

const pd = () => {
  console.log("oooooooooooooooooooooooo");
  if (!window.location.hash) {
    window.location = window.location + "#loaded";
    window.location.reload();
  }
};

// voterIdKey.map((val) => {
//     console.log("regVot", localStorage.getItem(val));
//   });

class AddVoter extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

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
    var addVoterBtn = document.getElementById("add-voter");
    var ethAddress = document.getElementById("eth-address-input");

    addVoterBtn.addEventListener("click", () => {
      var ethAddressValue = ethAddress.value;
      console.log("meee", ethAddressValue);
      // console.log(contract.methods);
      contract.methods
        .registerVoter(ethAddressValue)
        .send({
          from: accounts[0],
        })
        .then((res) => {
          console.log(res);
          console.log("added");

          voterIdKey.map((key)=>{
            if(localStorage.getItem(key)==ethAddressValue){
              localStorage.removeItem(key)
            }
          })

          Swal.fire({
            icon: "success",
            title: "Validation Done",
            showConfirmButton: false,
            timer: 4000,
          });
        });
    });
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
    }
    return (
      <div className="validate-voter-page">
        <AdminSideBar />
        <div className="pending-register">
          <h1>Validate these Voters</h1>
          
        
        </div>

        <div className="validate-vote-form">
        {voterIdKey.map((val) => {
          console.log("regVot", localStorage.getItem(val));
          return <h4>{localStorage.getItem(val)}</h4>;
        })}
          <input type="text" id="eth-address-input" placeholder="Ethereum Address"></input>
          <button id="add-voter">Add Voter</button>
        </div>
      </div>
    );
  }
}

export default AddVoter;
