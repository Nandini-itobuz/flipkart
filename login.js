
function setList(key, data) {
    if (typeof localStorage !== "undefined") {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(data));
      }
    } else {
      console.error("localStorage is not available in this environment.");
    }
}

function updateListItems(key,data) {
    localStorage.setItem(key, JSON.stringify(data));
}


let userProduct = JSON.parse(localStorage.getItem("userDetails"));

const currentman =[];
setList("currentUser",currentman);
let currentuser = JSON.parse(localStorage.getItem("currentUser"));
// console.log(currentuser);


const userDetails = JSON.parse(localStorage.getItem("userDetails") || '[]');
console.log(userDetails);

const userMailDetails = document.getElementsByClassName("inputfeild");
console.log(userMailDetails);

const loginBtn = document.getElementsByClassName("login-btn");
console.log(loginBtn[0]) 


loginBtn[0].addEventListener('click', () =>{
    let emailValue = userMailDetails[0].value;
    let passwordValue = userMailDetails[1].value;
    console.log(emailValue);
    console.log(passwordValue);
    

    let findUser = userDetails.find(ele => ele.email == emailValue );
    if(findUser.email === emailValue ){
        let currentObj = {"email": emailValue}
        currentman.push(currentObj);
        updateListItems("currentUser",currentman);
        loginBtn[0].setAttribute("href", "index.html")
    }

})