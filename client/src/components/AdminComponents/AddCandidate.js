import React,{ Component } from "react";

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

class AddCandidate extends Component {
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

    var nameInput = document.getElementById("name-input");
    var partyInput  = document.getElementById("party-input");
    var ageInput  = document.getElementById("age-input");
    var experinceInput  = document.getElementById("experince-input");

    var addCandidateBtn = document.getElementById("add-candidate-btn");

    addCandidateBtn.addEventListener("click",()=>{
      
        var name = nameInput.value;
        var party = partyInput.value;
        var age = ageInput.value;
        var experince = experinceInput.value;

                  // emit AddedCandidate(name, party, experince, age, voteCount);


        contract.methods.addCandidate(name,party,experince,age,0).send({from:accounts[0]}).then((res)=>{
            console.log(res);
        })

    }
    )


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


    return (
      <div className="add-field-form">
        <AdminSideBar />
        
        <div className="add-canidate-field">
          <h2>Add Candidate</h2>
          <input type="text" id="name-input" placeholder="Enter Candidate Name"></input>
          <input type="text" id="party-input"  placeholder="Enter Party Name"></input>
          <input type="text" id="experince-input" placeholder="Enter Candidate Experience"></input>
          <input type="text" id="age-input" placeholder="Enter Candidate Age"></input>
          <button id="add-candidate-btn">Add Candidate</button>
        </div>
      </div>
    );
  }
}

export default AddCandidate;
