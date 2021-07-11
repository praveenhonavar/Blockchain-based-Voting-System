import React from "react";
import { Link } from "react-router-dom";
import "../../styles/HomePage.css";
import LandingPage from "./LandingPage";

function HomePage() {
  return (
    <div className="home">
      <div className="home-page">
        <div className="home-page-form">
          <Link to="/SignUp">
            <h1>Login as User</h1>
          </Link>

          <Link to="/adminLogin">
            <h1>Login as Admin</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
