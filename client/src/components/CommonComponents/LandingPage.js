import React from "react";
import { Link } from "react-router-dom";

import vote from "./images/vote-1.png";
import eth from "./images/eth.png";

import unique from "./images/unique.png";
import secure from "./images/secure.png";
import bc from "./images/bc.png";
import ballot from "./images/ballot.png";

import "../../styles/LandingPage.css";

function LandingPage() {
  return (
    <div className="land-body">
      <div id="land-container">
        <nav>
          <ul id="nav-items">
            <li id="vote-block-logo">
              <img src={ballot} id="eth-img"></img>
              <h3>Vote Block</h3>
            </li>
            <li>Home</li>
            <li>About</li>
            <li>Features</li>
            <li>Sign Up | Sign In</li>
          </ul>
        </nav>
        <img src={vote} id="vote-img"></img>
        <h1 id="land-header">
          Welcome to <span id="bc-head">Blockchain</span> based Voting System
        </h1>
      </div>

      <div id="feat">
        <ul id="feat-items">
          <li id="unique-img">
            <img src={unique} id="feat-img"></img>
            <h3>Uniquely Identify each Vote</h3>
          </li>
          <li id="secure-system-img">
            <img src={secure} id="feat-img"></img>
            <h3>Secure System</h3>
          </li>
          <li id="bc-based-platform">
            <img src={bc} id="feat-img"></img>
            <h3>Blockchain based Platform</h3>
          </li>
        </ul>
      </div>

      <div id="foot-button">
        <Link to="/homePage">
          <button id="get-started-btn">Start Voting</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
