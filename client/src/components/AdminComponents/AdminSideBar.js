import React, { useEffect } from "react";
import "../../styles/SideBar.css";
import { Link } from "react-router-dom";

function AdminSideBar() {
  // const refresh = (e)=>{
  //   console.log("ioioio");

  //   // window.location.reload()
  // }

  return (
    <div className="side-nav-bar">
      <Link to="/">
        <div className="nav-items">
          <i class="fas fa-home fa-1x"></i>
          <h4>Home</h4>
        </div>
      </Link>

      <Link to="/addCandidate">
        <div className="nav-items">
          <i class="fas fa-user-plus fa-1x"></i>
          <h4>Add Candiates</h4>
        </div>
      </Link>

      <Link to="/addVoter">
        <div className="nav-items">
          <i class="far fa-check-circle fa-1x"></i>
          <h4>Validate Voters</h4>
        </div>
      </Link>

      <Link to="/changePhase">
        <div className="nav-items">
          <i class="fas fa-exchange-alt fa-1x"></i>
          <h4> Change Phase</h4>
        </div>
      </Link>

      <Link to="/candidateDetails">
        <div className="nav-items">
          <i class="fas fa-info fa-1x"></i>
          <h4 id="candidate-details">Candidate Details</h4>
        </div>
      </Link>

      <div className="nav-items">
        <i class="fas fa-sign-out-alt fa-1x"></i>
        <h4>Logout</h4>
      </div>
    </div>
  );
}

export default AdminSideBar;
