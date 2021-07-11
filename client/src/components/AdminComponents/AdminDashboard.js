import React from "react";
import AdminSideBar from "./AdminSideBar";
import "../../styles/AdminDashboard.css";
import vote from "../CommonComponents/images/ballot.png";


function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <AdminSideBar />
      <h1 className="user-dashboard-header">Admin Dashboard</h1>

      <div id="dashboard-items">
      <h2>Admin Responsibility | Steps for Registeration</h2>

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
          <h4>Register the Voters who have sent requests <br></br>you can get this in Validate Voters Tab</h4>
          <h4>For adding the candidates got to Add candidate Tab</h4>
          <h4>You can control the Phases involved in Election</h4>
        </div>
      </div>
    </div>


    </div>
  );
}

export default AdminDashboard;
