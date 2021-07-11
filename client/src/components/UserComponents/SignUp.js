import React from "react";
import "../../styles/SignUp.css";
import Swal from "sweetalert2/dist/sweetalert2.js";


const change = () => {
  console.log("yooooo");

  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container = document.getElementById("container");

  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });
};

const registerUser = (e) => {
  e.preventDefault();
  console.log("refeffef");
  const userName = document.getElementById("user-name").value;
  const userEmail = document.getElementById("user-email").value;
  const userPassword = document.getElementById("user-password").value;

  console.log(userEmail);

  localStorage.setItem(userEmail, userPassword);

  Swal.fire({
    icon: "success",
    title: "Signed Up Successfully",
    showConfirmButton: false,
    timer: 2000,
  });

  const container = document.getElementById("container");
  container.classList.remove("right-panel-active");


  console.log("added");
};

const loginUser = (e) => {
  e.preventDefault();

  const SiuserEmail = document.getElementById("user-email-si").value;
  const SiuserPassword = document.getElementById("user-password-si").value;

  console.log(SiuserEmail);

  const storedPwd = localStorage.getItem(SiuserEmail);
  console.log(storedPwd);

  if (storedPwd === SiuserPassword) {
    console.log("sec");
    Swal.fire({
        icon: "success",
        title: "Login Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
    window.open("http://localhost:3000/userDashboard")

  }
  else{
    Swal.fire({
        icon: "error",
        title: "Login Failed",
        showConfirmButton: false,
        timer: 2000,
      });
  }
};

function SignUp() {
  return (
    <div class="container" id="container">
      <div class="form-container sign-up-container">
        <h1 id="sign-up-head">Sign Up</h1>
        <form>
          <div class="social-container">
            <a href="#" class="social">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="social">
              <i class="fab fa-google"></i>
            </a>
            <a href="#" class="social">
              <i class="fab fa-facebook"></i>
            </a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" id="user-name" />
          <input type="email" placeholder="Email" id="user-email" />
          <input type="password" placeholder="Password" id="user-password" />
          <button onClick={registerUser}>Sign Up</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form>
          <h1>Sign In</h1>
          <div class="social-container">
            <a href="#" class="social">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="social">
              <i class="fab fa-google"></i>
            </a>
            <a href="#" class="social">
              <i class="fab fa-facebook"></i>
            </a>
          </div>
          <span>or use your account</span>
          <input type="email" placeholder="Email" id="user-email-si" />
          <input type="password" placeholder="Password" id="user-password-si" />
          <a href="#">Forgot your password?</a>
          <button onClick={loginUser}>Sign In</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>Please login with your personal info</p>
            <button class="ghost" id="signIn">
              Sign In
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Voter!</h1>
            <p>Enter your details here</p>
            <button class="ghost" id="signUp" onClick={change}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
