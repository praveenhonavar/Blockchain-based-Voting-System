import React, { Component } from "react";

import getWeb3 from "../../getWeb3";
import VotingContract from "../../contracts/Voting.json";

import AdminSideBar from "./AdminSideBar";
import "../../styles/AddCandidate.css";

const pd = () => {
  console.log("oooooooooooooooooooooooo");
  if (!window.location.hash) {
    window.location = window.location + "#loaded";
    window.location.reload();
  }
};

class ChangePhase extends Component {
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

    var changePhaseBtn = document.getElementById("change-phase-btn");

    changePhaseBtn.addEventListener('click',()=>{
        contract.methods.changePhase(1).send({
            from:accounts[0]
        }).then((res)=>{
            console.log(res);
        })
    })



  };

  render() {
    if (!this.state.web3) {
      pd();

      console.log("pkfpefpef");
      // window.location.reload()

      // return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="add-field-form">
        <AdminSideBar />
        <button id="change-phase-btn">Change</button>
      </div>
    );
  }
}

export default ChangePhase;
