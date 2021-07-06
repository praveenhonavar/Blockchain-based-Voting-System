import React from "react";
import { Link } from "react-router-dom";

function UserSideBar() {
  return (
    <div>
      <div className="side-nav-bar">
        <Link to="/">
          <div className="nav-items">
            <i class="fas fa-home fa-1x"></i>
            <h4>Home</h4>
          </div>
        </Link>

        <Link to="/voterRegister">
          <div className="nav-items">
            <i class="fas fa-user-plus fa-1x"></i>
            <h4>Register Yourself</h4>
          </div>
        </Link>

        <Link to="/castVote">
          <div className="nav-items">
            <i class="fas fa-vote-yea fa-1x"></i>
            <h4>Cast Your Vote</h4>
          </div>
        </Link>

        <Link to="/resultDisplay">
          <div className="nav-items">
            <i class="fas fa-poll fa-1x"></i>
            <h4>Results</h4>
          </div>
        </Link>


        <div className="nav-items">
          <i class="fas fa-sign-out-alt fa-1x"></i>
          <h4>Logout</h4>
        </div>
      </div>
    </div>
  );
}

export default UserSideBar;
