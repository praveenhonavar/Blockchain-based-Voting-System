import React from "react";
import UserSideBar from "./UserSideBar";
import "../../styles/VoterDashboard.css";
import vote from "../CommonComponents/images/ballot.png";

function UserDashboard() {
  return (
    <div className="voter-dashboard">
      <UserSideBar />
      <h1 className="user-dashboard-header">Voter Dashboard</h1>

      <div id="dashboard-items">
        <h2>Voters Responsibility | Steps for Voting</h2>

        <p id="vote-info">
          If you are a citizen of India and above 18 years of age, you are
          eligible to cast your vote in the elections. As per the Constitution
          of India, every Indian citizen who is of sound mind is given a
          universal voting right. The voter is not discriminated on the basis of
          factors like religion, caste, creed, economic status, etc. It does not
          matter the religion he/she belongs to and if he/she is rich or poor.{" "}
        </p>

        <div id="db-items-combined">
          <div>
            <img id="db-img" src={vote}></img>
          </div>

          <div id="db-items">
            <h4>Register yourself before Registration Phase is Completed</h4>
            <h4>Wait for the Voting phase and Cast your Vote</h4>
            <h4>You can see the results of Elections</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
