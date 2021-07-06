import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import UserSideBar from "../UserComponents/UserSideBar";
import "../../styles/VoterRegister.css";
import Swal from "sweetalert2/dist/sweetalert2.js";

let voters = {
  v1: {
    mail: "blockbook1109@gmail.com",
    name: "pd",
  },
  v2: {
    mail: "spktech606@gmail.com",
    name: "pd",
  },

  v3: {
    mail: "abcd@gmail.com",
    name: "pd",
  },
};

console.log(Object.keys(voters));

function VoterRegister() {
  var digits = "0123456789";

  var otpLength = 4;

  var otp = "";
  const [flag, setFlag] = useState(1);
  const [OTP, setOTP] = useState();

  const [voterId, setVoterId] = useState([]);
  const [ethAddress, setEthAddress] = useState("");

  useEffect(() => {
    for (let i = 1; i <= 4; i++) {
      var index = Math.floor(Math.random() * digits.length);

      otp = otp + digits[index];
    }
    console.log(otp);
    setOTP(otp);
  }, []);

  function sendMail(e) {
    e.preventDefault();
    Swal.fire({
      title: "OTP sent to your Registered Mail",
      showConfirmButton: false,
      timer: 2000,
    });

    // generateOTP();
    console.log("jijijjijijij", OTP);

    console.log(voterId);

    console.log(voters[voterId].mail);
    let userMail = voters[voterId].mail;

    emailjs
      .send(
        "service_ze5a9tj",
        "template_qlyl0pq",
        { "user-mail": `${userMail}`, message: `${OTP}` },
        "user_Fw69jbPqNdDCyieMVNMR5"
      )
      .then((res) => {
        console.log(res);
      });
    setFlag(0);
  }

  function verifyOTP() {
    var enteredOTP = document.getElementById("enteredOTP").value;
    console.log(enteredOTP);
    console.log(OTP);
    if (OTP == enteredOTP) {
      console.log("xes");
      localStorage.setItem(voterId, ethAddress);
      // localStorage.setItem(ethAddress,ethAddress);
      Swal.fire({
        icon: "success",
        title: "OTP verification Successfully",
        showConfirmButton: false,
        timer: 4000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "OTP verification Failed",
        showConfirmButton: false,
        timer: 2000,
      });
      console.log("fo");
    }
  }

  return flag ? (
    <div>
      <UserSideBar />

      <div className="voter-register-form">
        <h1>Register Yourself</h1>
        <form onSubmit={sendMail}>
          <input
            type="text"
            onChange={(e) => {
              setVoterId(e.target.value);
            }}
            placeholder="Your Voter ID Number"
            id="voter-id-input"
          ></input>
          <br></br>
          <input
            type="text"
            onChange={(e) => {
              setEthAddress(e.target.value);
            }}
            placeholder="Your Ethereum Address"
            id="eth-address-input"
          ></input>
          <br></br>

          <button id="register-btn">Register</button>
        </form>
      </div>
    </div>
  ) : (
    <div className="verify-otp-form">
      <h2>Enter your OTP here</h2>
      <div className="verify-otp-fields">
        <input type="text" id="enteredOTP" placeholder="Enter your OTP"></input>
        <br></br>
        <button onClick={verifyOTP} id="verify-otp-btn">
          Verify
        </button>
      </div>
    </div>
  );
}

export default VoterRegister;
