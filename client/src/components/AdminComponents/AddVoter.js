import React, { Component } from "react";
import getWeb3 from "../../getWeb3";
// import SimpleStorageContract from "../../contracts/SimpleStorage.json";
import VotingContract from "../../contracts/Voting.json";

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

console.log(voterIdKey);

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
    var ethAddress = document.getElementById("eth-address");

    addVoterBtn.addEventListener("click", () => {
      var ethAddressValue = ethAddress.value;
      console.log("meee", ethAddressValue);

      console.log(contract.methods);

      contract.methods
        .registerVoter(ethAddressValue)
        .send({
          from: accounts[0],
        })
        .then((res) => {
          console.log(res);
          console.log("added");
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
    //   if (!this.state.web3) {
    //     return <div>Loading Web3, accounts, and contract...</div>;
    //   }
    return (
      <div className="App">
        <div className="pending-register">
        <h4>pending-register</h4>
          {
            voterIdKey.map((val) => {
            console.log("regVot", localStorage.getItem(val));
            return (<h4>{localStorage.getItem(val)}</h4>);
          })
         }
        </div>

        <input type="text" id="eth-address"></input>
        <button id="add-voter">Add Voter</button>
      </div>
    );
  }
}

export default AddVoter;
