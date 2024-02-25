import user from "./data.json" assert { type: "json" };
import filex from "./filex.json" assert { type: "json" };
import cartdata from "./cart.json" assert { type: "json" };
setList("cartList", cartdata);
setList("userCarts", filex);

const x = JSON.stringify(user);
const items = JSON.parse(x);
const cardGroup = document.getElementById("content");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const currentMail = currentUser[0]["email"];
const get = localStorage.getItem("userCarts");
const parsedGet = JSON.parse(get);
if (parsedGet.length === 0) {
  parsedGet.push({ [currentMail]: [] });
}
const cartItems = get
  ? parsedGet.find((ele) => ele[currentMail])[currentMail]
  : [];
  
const total = document.getElementById("cart-num");
const nav = document.getElementsByClassName("nav");
const inpText = document.getElementById("text-input");
const dropDown = document.getElementById("sortDropdown");
let users = JSON.parse(localStorage.getItem("userCarts"));
let themeDiv = document.getElementsByClassName("theme");
let theme = document.getElementById("theme-img");
let dataTheme = localStorage.getItem("data-theme");
let white = "#ffffff";
let black = "#060608";

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

function totalitems() {
  let totalCartItem = cartItems.length;
  total.textContent = totalCartItem;
  if (totalCartItem >= 1) {
    total.style.display = "block";
  } else {
    total.style.display = "none";
  }
}

function centerCartBtn(cartAddbtn, cartMinusbtn, addtocartbtn, i) {
  cartAddbtn.style.display = "block";
  cartMinusbtn.style.display = "block";
  let cartObj = { id: items[i]?.id, quantity: 1, price: items[i]["price"] };
  let currObj = {};

  const keyToSearch = "id";
  const valueToSearch = items[i]["id"];
  const foundObject = cartItems.find((obj) => obj[keyToSearch] === valueToSearch);

  const objIndex = cartItems.findIndex(
    (obj) => obj[keyToSearch] === valueToSearch
  );

  if (!foundObject) {
    addtocartbtn.textContent = 1;
    cartItems.push(cartObj);
    updateListItems("cartList", cartItems);
    currObj[currentMail] = cartItems;
    users = users.filter((user) => !user[currentMail]);
    users.push(currObj);
    updateListItems("userCarts", users);
  } else {
    cartItems[objIndex]["quantity"]++;
    addtocartbtn.textContent = cartItems[objIndex]["quantity"];
    updateListItems("cartList", cartItems);
    currObj[currentMail] = cartItems;
    users.push(currObj);
    updateListItems("userCarts", users);
  }

  totalitems();
}

function addCartBtn(addtocartbtn, i) {
  const keyToSearch = "id";
  const valueToSearch = items[i]["id"];
  const objIndex = cartItems.findIndex(
    (obj) => obj[keyToSearch] === valueToSearch
  );
  cartItems[objIndex]["quantity"]++;
  updateListItems("cartList", cartItems);
  addtocartbtn.textContent = cartItems[objIndex]["quantity"];
  let currObj = {};
  currObj[currentMail] = cartItems;

  users = users.filter((user) => !user[currentMail]);
  users.push(currObj);
  updateListItems("userCarts", users);
  totalitems();
}

function minusCartBtn(addtocartbtn, cartAddbtn, cartMinusbtn, i) {
  const keyToSearch = "id";
  const valueToSearch = items[i]["id"];
  const objIndex = cartItems.findIndex(
    (obj) => obj[keyToSearch] === valueToSearch
  );
  let z = --cartItems[objIndex]["quantity"];

  if (z === 0) {
    cartItems[objIndex]["quantity"] = 0;
    addtocartbtn.textContent = "Add to cart";
    cartAddbtn.style.display = "none";
    cartMinusbtn.style.display = "none";
    updateListItems("cartList", cartItems);
    let currObj = {};
    currObj[currentMail] = cartItems;
    users = users.filter((user) => !user[currentMail]);
    updateListItems("userCarts", users);
    cartItems.splice(objIndex, 1);
    updateListItems("cartList", cartItems);
    currObj[currentMail] = cartItems;
    users.push(currObj);
    updateListItems("userCarts", users);
  } else {
    addtocartbtn.textContent = cartItems[objIndex]["quantity"];
    updateListItems("cartList", cartItems);

    let currObj = {};
    currObj[currentMail] = cartItems;
    users = users.filter((user) => !user[currentMail]);
    users.push(currObj);
    updateListItems("userCarts", users);
  }
  totalitems();
}

function main(items) {
  for (let i = 0; i < items.length; i++) {
    const cardGroupItem = document.createElement("div");
    cardGroup.appendChild(cardGroupItem);
    cardGroupItem.classList.add('itemContainer')
    cardGroupItem.setAttribute("id", "cardGroupItem".concat(i));

    const cardImg = document.createElement("img");
    cardImg.setAttribute("src", items[i]["image"]);
    cardGroupItem.appendChild(cardImg);
    cardImg.classList.add('itemContainerImg')

    const cardText = document.createElement("div");
    cardGroupItem.appendChild(cardText);

    const cardName = document.createElement("h2");
    cardText.appendChild(cardName);
    cardName.textContent = items[i]["productName"];
    cardName.classList.add('itemContainerName')

    const cardDetails = document.createElement("p");
    cardText.appendChild(cardDetails);
    cardDetails.textContent = items[i]["description"];
    cardDetails.classList.add('itemContainerDetails')

    const cardPrice = document.createElement("h3");
    cardText.appendChild(cardPrice);
    cardPrice.textContent = "\u20b9".concat(items[i]["price"]);
    cardPrice.classList.add("itemContainerPrice")

    const cardDiv = document.createElement("div");
    cardText.appendChild(cardDiv);
    cardDiv.classList.add("itemContainerBtn")

    const cardMinusButton = document.createElement("button");
    cardDiv.appendChild(cardMinusButton);
    cardMinusButton.textContent = "-";
    cardMinusButton.setAttribute("class", "cart-minusbtn".concat(i));
    cardMinusButton.classList.add("itemContainerMinus")
    

    const cardButton = document.createElement("button");
    cardDiv.appendChild(cardButton);
    cardButton.textContent = "Add to Cart";
    cardButton.setAttribute("class", "cart-btn".concat(i));
    cardButton.classList.add('itemContainerBtns');

    const cardAddButton = document.createElement("button");
    cardDiv.appendChild(cardAddButton);
    cardAddButton.textContent = "+";
    cardAddButton.setAttribute("class", "cart-addbtn".concat(i));
    cardAddButton.classList.add('itemContainerAdd')
  }
}

function themeProuductPage() {
  if (dataTheme === "0") {
    document.body.style.backgroundColor = "#060608";
    nav[0].style.backgroundColor = "#060608";
    theme.setAttribute("src", "images//sun-solid.svg");
    localStorage.setItem("data-theme", "1");
  } else {
    document.body.style.backgroundColor = "#ffffff";
    nav[0].style.backgroundColor = "#ffffff";
    theme.setAttribute("src", "images//moon-solid.svg");
    localStorage.setItem("data-theme", "0");
  }
}

themeProuductPage();
totalitems();
main(items);

cardGroup.addEventListener("click", function (event) {
  for (let i = 0; i < 8; i++) {
    let cartMinusbtn = document.getElementsByClassName("cart-minusbtn".concat(i));
    let cartAddbtn = document.getElementsByClassName("cart-addbtn".concat(i));
    let addtocartbtn = document.getElementsByClassName("cart-btn".concat(i));

    if (event.target.classList.contains("cart-btn".concat(i))) {
      centerCartBtn(cartAddbtn[0], cartMinusbtn[0], addtocartbtn[0], i);
    }

    if (event.target.classList.contains("cart-addbtn".concat(i))) {
      addCartBtn(addtocartbtn[0], i);
    }

    if (event.target.classList.contains("cart-minusbtn".concat(i))) {
      minusCartBtn(addtocartbtn[0], cartAddbtn[0], cartMinusbtn[0], i);
    }
  }
});

inpText.addEventListener("input", () => {
  let val = inpText.value;
  cardGroup.innerHTML = "";
  let arr = [];
  items.filter((item) => {
    if (item["productName"].toLowerCase().includes(val)) arr.push(item);
  });
  if (arr.length) main(arr);
});

dropDown.addEventListener("change", function (event) {
  const selectedOption = event.target.value;

  switch (selectedOption) {
    case "1":
      let htolSorted = items.sort((a, b) => Number(b.price) - Number(a.price));
      cardGroup.innerHTML = "";
      main(htolSorted);
      break;
    case "2":
      let ltohSorted = items.sort((a, b) => Number(a.price) - Number(b.price));
      cardGroup.innerHTML = "";
      main(ltohSorted);
      break;
    case "3":
      cardGroup.innerHTML = "";
      let arrApple = [];
      items.filter((item) => {
        if (item["productName"].toLowerCase().includes("apple"))
          arrApple.push(item);
      });
      main(arrApple);
      break;
    case "4":
      cardGroup.innerHTML = "";
      let arrHuawei = [];
      items.filter((item) => {
        if (item["productName"].toLowerCase().includes("huawei"))
          arrHuawei.push(item);
      });
      main(arrHuawei);
      break;
    case "5":
      cardGroup.innerHTML = "";
      let arrDell = [];
      items.filter((item) => {
        if (item["productName"].toLowerCase().includes("dell"))
          arrDell.push(item);
      });
      main(arrDell);
      break;
    case "6":
      cardGroup.innerHTML = "";
      let arrAsus = [];
      items.filter((item) => {
        if (item["productName"].toLowerCase().includes("asus"))
          arrAsus.push(item);
      });
      main(arrAsus);
      break;
  }
});

themeDiv[0].addEventListener("click", function () {
  let dataTheme = localStorage.getItem("data-theme");
  if (dataTheme === "0") {
    localStorage.setItem("data-theme", "1");
    console.log("ok");
    document.body.style.backgroundColor = "#060608";
    nav[0].style.backgroundColor = "#060608";
    theme.setAttribute("src", "images//sun-solid.svg");
  } else {
    localStorage.setItem("data-theme", "0");
    document.body.style.backgroundColor = white;
    nav[0].style.backgroundColor = white;
    theme.setAttribute("src", "images//moon-solid.svg");
  }
});
