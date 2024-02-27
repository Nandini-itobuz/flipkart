const otpInput = document.getElementsByClassName("login-verify");
const getotpbtn = document.getElementsByClassName("login-btn");
const otpBtn = document.getElementsByClassName("verify-btn");
const email = document.getElementsByClassName("inputfeild");
otpBtn[0].style.display = "none";
getotpbtn[2].style.display = "none";
let users = [];
setList("userDetails", users);
let userDetails = JSON.parse(localStorage.getItem("userDetails"));

function setList(key, data) {
  if (typeof localStorage !== "undefined") {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  } else {
    console.error("localStorage is not available in this environment.");
  }
}

function updateListItems(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function sendOtp() {
  let otpValue = Math.floor(Math.random() * 100000);
  let emailBody = `<h2>Your OTP is </h2>${otpValue}`;
  Email.send({
    SecureToken: "866b863a-baa3-4b0c-b1fc-e15a24518420",
    To: email[1].value,
    From: "nandini@itobuz.com",
    Subject: "Verify Email!",
    Body: emailBody,
  }).then((message) => {
    if (message === "OK") {
      alert("OTP sent to your email " + email[1].value);

      otpInput[0].style.display = "block";
      email[2].style.display = "block";
      otpBtn[0].style.display = "block";
      getotpbtn[0].style.display = "none";
      console.log(email[3].value);
      otpBtn[0].addEventListener("click", () => {
        if (email[4].value === otpValue) {
          alert("Email Address Verified");
          if (message === "OK") {
            getotpbtn[2].style.display = "block";
            getotpbtn[1].style.display = "none";

            let userFormDetails = document.getElementsByClassName("inputfeild");
            const userObj = {
              userId: userDetails.length,
              name: userFormDetails[0].value,
              email: userFormDetails[1].value,
              password: userFormDetails[2].value,
            };

            userDetails.push(userObj);
            updateListItems("userDetails", userDetails);
          }
        } else {
          alert("invalid otp");
        }
      });
    }
  });
}
