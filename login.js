const userDetails = JSON.parse(localStorage.getItem("userDetails") || '[]');
const userMailDetails = document.getElementsByClassName("inputfeild");
const loginBtn = document.getElementsByClassName("login-btn");
const currentman = [];
setList("currentUser", currentman);
let userProduct = JSON.parse(localStorage.getItem("userDetails"));
let currentuser = JSON.parse(localStorage.getItem("currentUser"));

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

loginBtn[0].addEventListener('click', () => {
  let emailValue = userMailDetails[0].value;
  let passwordValue = userMailDetails[1].value;
  
  let findUser = userDetails.find(ele => ele.email === emailValue);
  if (findUser.email === emailValue) {
    let currentObj = { "email": emailValue }
    currentman.push(currentObj);
    updateListItems("currentUser", currentman);
    loginBtn[0].setAttribute("href", "index.html")
  }

})