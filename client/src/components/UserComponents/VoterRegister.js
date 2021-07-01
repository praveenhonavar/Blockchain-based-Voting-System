import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import UserSideBar from "../UserComponents/UserSideBar";
import "../../styles/VoterRegister.css";

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

  // function generateOTP() {
  //   var digits = "0123456789";

  //   var otpLength = 4;

  //   var otp = "";

  //   for (let i = 1; i <= otpLength; i++) {
  //     var index = Math.floor(Math.random() * digits.length);

  //     otp = otp + digits[index];
  //   }
  //   console.log(otp);
  //   setOTP(otp);

  //   // return otp;
  // }

  // window.onload = () => {
  //   var result = generateOTP();
  //   setOTP(result);
  //   console.log(OTP);
  // };

  function sendMail(e) {
    e.preventDefault();

    // generateOTP();
    console.log("jijijjijijij",OTP);

    console.log(voterId);

    console.log(voters[voterId].mail);
    let userMail = voters[voterId].mail;

    // emailjs
    //   .sendForm(
    //     "service_ze5a9tj",
    //     "template_qlyl0pq",
    //     e.target,
    //     "user_Fw69jbPqNdDCyieMVNMR5"
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   });

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
    } else {
      console.log("fo");
    }
  }

  return flag ? (
    <div>
      <UserSideBar />

      <div className="voter-register-form">
        <h2>Register Yourself</h2>
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
