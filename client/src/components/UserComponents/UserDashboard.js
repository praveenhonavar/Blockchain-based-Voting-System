import React from "react";
import UserSideBar from "./UserSideBar";
import "../../styles/VoterDashboard.css";

function UserDashboard() {
  return (
    <div className="voter-dashboard">
      <UserSideBar />
      <h2>Voter Dashboard</h2>
    </div>
  );
}

export default UserDashboard;
