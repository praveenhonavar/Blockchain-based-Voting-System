import React from "react";
import { Link } from "react-router-dom";
import "../../styles/HomePage.css";

function HomePage() {
  return (
    <div className="home-page">
      <div className="home-page-form">
        <Link to="/userDashboard">
          <h1>Login as User</h1>
        </Link>

        <Link to="/adminDashboard">
          <h1>Login as Admin</h1>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
