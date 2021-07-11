import React, { Component } from "react";

import getWeb3 from "../../getWeb3";
import VotingContract from "../../contracts/Voting.json";

import AdminSideBar from "./AdminSideBar";
import "../../styles/ChangePhase.css";

const pd = () => {
  if (!window.location.hash) {
    console.log("oooooooooooooooooooooooo");

    window.location = window.location + "#loaded";
    window.location.reload();
  }
};

var phase;

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

    var phaseField = document.getElementById("phase-field");
    var changePhaseBtn = document.getElementById("change-phase-btn");

    var additionalDetails = document.getElementById("additional-details");

    console.log(contract.methods);

    contract.methods
      .getPhaseId()
      .call()
      .then((val) => {
        console.log("phase id", val);
        if (val == 0) {
          phaseField.innerHTML = `Current Phase is Registeration Phase 📝`;
          additionalDetails.innerHTML += `<h6>Voters can send Registeration Requests Now</h6>`;
        }

        if (val == 1) {
          phaseField.innerHTML = `<div id="voter-head">Current Phase is Voting Phase ✔</div>`;
          additionalDetails.innerHTML += `<h6 id="voters">Voters can Vote Now </h6>`;
        }

        if (val == 2) {
          phaseField.innerHTML = `<div id="phase-head">Current Phase is Results Phase 💯</div>`;
          additionalDetails.innerHTML += `<h6 id="voter-result">Voters can View the Results Now </h6>`;
        }
      });

    // contract
    //   .getPastEvents("PhaseChanged", {
    //     fromBlock: "latest",
    //     toBlock: "latest",
    //   })
    //   .then((val, err) => {
    //     console.log("PPDDD", val);
    //     if (val == "") {
    //       console.log("fokokok");
    //       phase=0
    //     } else {
    //       phaseField.innerHTML = val[0].returnValues.phase;
    //       phase = val[0].returnValues.phaseId;
    //       console.log("iddddddddddd", phase);
    //     }
    //     console.log("iddddddddddd", phase);
    //   });

    changePhaseBtn.addEventListener("click", () => {
      contract
        .getPastEvents("PhaseChanged", {
          fromBlock: "latest",
          toBlock: "latest",
        })
        .then((val, err) => {
          if (val == "") {
            console.log("PPDDD", val);

            contract.methods
              .changePhase(0)
              .send({
                from: accounts[0],
              })
              .then((res) => {
                // phase = 0;
                console.log("Register phase", res);
                pd();

                // phaseField.innerHTML = `<h1>Register Phase</h1>`
              });
          } else {
            // phaseField.innerHTML = val[0].returnValues.phase;
            phase = val[0].returnValues.phaseId;

            console.log("iddddddddddd", phase);
            if (phase == 0) {
              contract.methods
                .changePhase(1)
                .send({
                  from: accounts[0],
                })
                .then((res) => {
                  // phase = 1;
                  console.log("Vote phase", res);
                  pd();

                  // phaseField.innerHTML = `<h1>Voting Phase</h1>`
                });
            } else if (phase == 1) {
              contract.methods
                .changePhase(2)
                .send({
                  from: accounts[0],
                })
                .then((res) => {
                  // phase = 2;
                  console.log("Results phase", res);
                  pd();

                  // phaseField.innerHTML = `<h1>Results Phase</h1>`
                });
            } else {
              contract.methods
                .changePhase(0)
                .send({
                  from: accounts[0],
                })
                .then((res) => {
                  // phase = 0;
                  console.log("Register phase", res);
                  pd();

                  // phaseField.innerHTML = `<h1>Register Phase</h1>`
                });
            }
          }
        });
    });
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
        <h1 id="phase-field"></h1>

        <button id="change-phase-btn">Change</button>

        <h1 id="additional-details"> </h1>
      </div>
    );
  }
}

export default ChangePhase;
