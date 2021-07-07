import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

import AddVoter from "./components/AdminComponents/AddVoter";
import HomePage from "./components/CommonComponents/HomePage";
import AdminDashboard from "./components/AdminComponents/AdminDashboard";
import UserDashboard from "./components/UserComponents/UserDashboard";
import VoterRegister from "./components/UserComponents/VoterRegister";
import AddCandidate from "./components/AdminComponents/AddCandidate";
import CandidateDetails from "./components/AdminComponents/CandidateDetails";
import CastVote from "./components/UserComponents/CastVote";
import ChangePhase from "./components/AdminComponents/ChangePhase";
import ResultDisplay from "./components/UserComponents/ResultDisplay";
import SignUp from "./components/UserComponents/SignUp";

class App extends Component {
  //   state = { storageValue: 0, web3: null, accounts: null, contract: null };

  //   componentDidMount = async () => {
  //     try {
  //       // Get network provider and web3 instance.
  //       const web3 = await getWeb3();

  //       // Use web3 to get the user's accounts.
  //       const accounts = await web3.eth.getAccounts();

  //       // Get the contract instance.
  //       const networkId = await web3.eth.net.getId();
  //       const deployedNetwork = SimpleStorageContract.networks[networkId];
  //       const instance = new web3.eth.Contract(
  //         SimpleStorageContract.abi,
  //         deployedNetwork && deployedNetwork.address,
  //       );

  //       // Set web3, accounts, and contract to the state, and then proceed with an
  //       // example of interacting with the contract's methods.
  //       this.setState({ web3, accounts, contract: instance }, this.runExample);
  //     } catch (error) {
  //       // Catch any errors for any of the above operations.
  //       alert(
  //         `Failed to load web3, accounts, or contract. Check console for details.`,
  //       );
  //       console.error(error);
  //     }
  //   };

  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(5).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };

  // <Route path="/candidateDetails" component={CandidateDetails}></Route>

  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route path="/adminDashboard" component={AdminDashboard}></Route>
            <Route path="/userDashboard" component={UserDashboard}></Route>
            <Route path="/voterRegister" component={VoterRegister}></Route>
            <Route path="/addVoter" component={AddVoter}></Route>
            <Route path="/addCandidate" component={AddCandidate}></Route>
            <Route path="/candidateDetails" component={CandidateDetails}></Route>
            <Route path="/castVote" component={CastVote}></Route>
            <Route path="/changePhase" component={ChangePhase}></Route>
            <Route path="/resultDisplay" component={ResultDisplay}></Route>
            <Route path="/signUp" component={SignUp}></Route>

          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
