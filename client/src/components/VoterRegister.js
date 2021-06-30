import React, { useState } from "react";
import emailjs from "emailjs-com";

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
  const [flag, setFlag] = useState(1);
  const [OTP, setOTP] = useState();

  const [voterId, setVoterId] = useState([]);
  const [ethAddress, setEthAddress] = useState("");

  function generateOTP() {
    var digits = "0123456789";

    var otpLength = 4;

    var otp = "";

    for (let i = 1; i <= otpLength; i++) {
      var index = Math.floor(Math.random() * digits.length);

      otp = otp + digits[index];
    }
    console.log(otp);
    return otp;
  }

  window.onload = () => {
    var result = generateOTP();
    setOTP(result);
    console.log(OTP);
  };

  function sendMail(e) {
    e.preventDefault();
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
      <form onSubmit={sendMail}>
        <input
          type="text"
          onChange={(e) => {
            setVoterId(e.target.value);
          }}
          placeholder="Voter ID"
        ></input>
        <input
          type="text"
          onChange={(e) => {
            setEthAddress(e.target.value);
          }}
          placeholder="Eth Address"
        ></input>

        <button id="register">Register</button>
      </form>
    </div>
  ) : (
    <div>
      OTP
      <input type="text" id="enteredOTP"></input>
      <button onClick={verifyOTP}>verify</button>
    </div>
  );
}

export default VoterRegister;
