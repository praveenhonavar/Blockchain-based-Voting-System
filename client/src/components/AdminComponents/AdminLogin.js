import React from "react";
import { Link } from "react-router-dom";
import "../../styles/AdminLogin.css";

const adminLogin = () => {
  var adminInput = document.getElementById("admin-input");
  var adminPass = document.getElementById("admin-password");

  var adminLoginBtn = document.getElementById("admin-login-btn");

  adminLoginBtn.addEventListener("click", () => {
    var adminName = adminInput.value;
    var adminPassword = adminPass.value;

    if (adminName === "admin" && adminPassword === "admin") {
      window.open("http://localhost:3000/adminDashboard");
    } else {
      alert("Failed");
    }
  });
};

function AdminLogin() {
  return (
    <div className="admin-login-form">
      <div className="admin-login">
        <h2>Admin Login</h2>
        <input id="admin-input" placeholder="Admin UserName"></input>
        <input id="admin-password" placeholder="Admin Password"></input>
        <button id="admin-login-btn" onClick={adminLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
