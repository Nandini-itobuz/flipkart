 function sendOtp(){
    console.log("add");
    const email = document.getElementsByClassName("inputfeild");
    console.log(email[1]);
    console.log(email[2]);

    let otpValue= Math.floor(Math.random()* 100000);
    let emailBody = `<h2>Your OTP is </h2>${otpValue}`;
    Email.send({
        SecureToken : "866b863a-baa3-4b0c-b1fc-e15a24518420",
        To : email[1].value,
        From : "nandini@itobuz.com",
        Subject : "Verify Email!",
        Body : emailBody,
    }).then(

      message =>{
        if(message === "OK"){
            alert("OTP sent to your email "+ email[1].value);

            email[2].style.display = "block";
            const otpInput = email[2];
            const otpBtn = document.getElementsByClassName("login-verify")[0];

            otpBtn.addEventListener("click", () =>{
                if(otpInput.value == otpValue){
                    alert("Email Address Varified")
                }
                else{
                    alert("invalid otp");
                }
            })

        }
      }
    );
 }
