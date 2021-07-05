import React, { Component } from "react";

import getWeb3 from "../../getWeb3";
import VotingContract from "../../contracts/Voting.json";

import UserSideBar from "./UserSideBar";
import "../../styles/CastVote.css";

const pd = () => {
  console.log("oooooooooooooooooooooooo");
  if (!window.location.hash) {
    window.location = window.location + "#loaded";
    window.location.reload();
  }
};

var name, age, party, experince;

var cName = [];
var cAge = [];
var cExprience = [];
var cParty = [];

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

    // var candidateCardPlace = document.getElementById("candidate-card-place");
    var candidateSelect = document.getElementById("candidate-select-tab");
    var showCandidate = document.getElementById("show-candidate");

    contract
      .getPastEvents("AddedCandidate", {
        fromBlock: 0,
        toBlock: "latest",
      })
      .then((res) => {
        res.map((val) => {
          console.log("koooooooooo", val);

          var candidateId = val.returnValues.id;
          name = val.returnValues.name;
          age = val.returnValues.age;
          party = val.returnValues.party;
          experince = val.returnValues.experince;
          var voteCount = val.returnValues.voteCount;

          cName.push(name);
          cAge.push(age);
          cExprience.push(experince);
          cParty.push(party);

          candidateSelect.innerHTML += `<option value=${candidateId}> ${name}</option>`;

          return <div></div>;
        });
        // console.log(res);
      });

    candidateSelect.addEventListener("change", () => {
      var cid = candidateSelect.options[candidateSelect.selectedIndex].value;
      console.log(cid);

      var candName = cName[cid - 1];
      var candAge = cAge[cid - 1];
      var candParty = cParty[cid - 1];
      var candExperience = cExprience[cid - 1];

      console.log(cName[cid - 1]);

      showCandidate.innerHTML =
      `<main class="container">
      <div class="card">
        <img src="https://res.cloudinary.com/alexandracaulea/image/upload/v1582179610/user_fckc9f.jpg" alt="User image" class="card__image" />
        <div class="card__text">
          <h2>${candName}</h2>
          <p>I enjoy drinking a cup of coffee every day</p>
        </div>
        <ul class="card__info">
          <li>
            <span class="card__info__stats">${candAge}</span>
            <span>Age</span>
          </li>
          <li>
            <span class="card__info__stats">${candParty}</span>
            <span>Party</span>
          </li>
          <li>
            <span class="card__info__stats">${candExperience}</span>
            <span>Experience</span>
          </li>
        </ul>
        <div class="card__action">
          <button id="vote-btn" class="card__action__button card__action--follow">Vote</button>
        </div>
      </div>
    </main>`



      // showCandidate.innerHTML = `

      // <h1>${cid}</h1><button id="vote-btn">Vote</button>`;

      // showCandidate.innerHTML = `<div className="card">
      // <img
      //   src="https://res.cloudinary.com/alexandracaulea/image/upload/v1582179610/user_fckc9f.jpg"
      //   alt="User image"
      //   class="card__image"
      // />
      // <div class="card__text">
      //   <h2>${candName}</h2>
       
      // </div>
      // <ul class="card__info">
      //   <li>
      //     <span class="card__info__stats">${candAge}</span>
      //     <span>age</span>
      //   </li>
      //   <li>
      //     <span class="card__info__stats">${candParty}</span>
      //     <span>Party</span>
      //   </li>
      //   <li>
      //     <span class="card__info__stats">${candExperience}</span>
      //     <span>experience</span>
      //   </li>
      // </ul>
      
      // <div class="card__action">
      //   <button  id="vote-btn"class="card__action__button card__action--follow">
      //     Vote
      //   </button>
      //   <button class="card__action__button card__action--message">
      //     message
      //   </button>
      // </div>
      // </div>`;

      var btns = document.getElementById("vote-btn");
      console.log(btns);
      btns.addEventListener("click", () => {
        console.log("innnnn", cid);
        contract.methods
          .castVote(cid)
          .send({
            from: accounts[0],
          })
          .then((res) => {
            console.log("donee", res);
          });
      });
    });

    console.log(candidateSelect);
  };

  render() {
    if (!this.state.web3) {
      pd();

      console.log("pkfpefpef");
      // window.location.reload()

      // return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="cast-vote-page">
        <UserSideBar />

        <h1>Cast Vote</h1>

        <select id="candidate-select-tab">
          <option>Select Candidate</option>
        </select>

        <div id="show-candidate"></div>
      </div>
    );
  }
}

export default CandidateDetails;
