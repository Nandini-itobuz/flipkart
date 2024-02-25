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

function main(items) {
  cardGroup.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    const keyToSearch = "id";
    const valueToSearch = items[i]["id"];
    const objIndex = cartItems.findIndex(
      (obj) => obj[keyToSearch] === valueToSearch
    );

    console.log(objIndex);

    const x = items[i]["id"];
    const cardGroupItem = document.createElement("div");
    cardGroup.appendChild(cardGroupItem);
    cardGroupItem.classList.add("itemContainer");
    cardGroupItem.setAttribute("id", items[i]["id"]);

    const cardImg = document.createElement("img");
    cardImg.setAttribute("src", items[i]["image"]);
    cardGroupItem.appendChild(cardImg);
    cardImg.classList.add("itemContainerImg");

    const cardText = document.createElement("div");
    cardGroupItem.appendChild(cardText);

    const cardName = document.createElement("h2");
    cardText.appendChild(cardName);
    cardName.textContent = items[i]["productName"];
    cardName.classList.add("itemContainerName");

    const cardDetails = document.createElement("p");
    cardText.appendChild(cardDetails);
    cardDetails.textContent = items[i]["description"];
    cardDetails.classList.add("itemContainerDetails");

    const cardPrice = document.createElement("h3");
    cardText.appendChild(cardPrice);
    cardPrice.textContent = "\u20b9".concat(items[i]["price"]);
    cardPrice.classList.add("itemContainerPrice");

    const cardDiv = document.createElement("div");
    cardText.appendChild(cardDiv);
    cardDiv.classList.add("itemContainerBtn");
    cardDiv.classList.add("cards");

    const cardMinusButton = document.createElement("button");
    cardDiv.appendChild(cardMinusButton);
    cardMinusButton.textContent = "-";
    cardMinusButton.setAttribute("class", "cart-minusbtn".concat(i));
    cardMinusButton.classList.add("itemContainerMinus");
    cardMinusButton.setAttribute("data-minus-btn", items[i]["id"]);
    cardMinusButton.onclick = function () {
      decrement(items[i]["id"]);
    };
    if (objIndex === -1) cardMinusButton.style.display = "none";
    else cardMinusButton.style.display = "block";
    const cardButton = document.createElement("button");
    cardDiv.appendChild(cardButton);

    if (objIndex === -1) cardButton.textContent = "Add to cart";
    else cardButton.textContent = cartItems[objIndex]["quantity"];
    cardButton.classList.add("itemContainerBtns");
    cardButton.onclick = function () {
      added(items[i]["id"], cardMinusButton, cardAddButton, cardButton);
    };

    const cardAddButton = document.createElement("button");
    cardDiv.appendChild(cardAddButton);
    cardAddButton.textContent = "+";
    cardAddButton.classList.add("itemContainerAdd");
    if (objIndex === -1) cardAddButton.style.display = "none";
    else cardAddButton.style.display = "block";
    cardAddButton.onclick = function () {
      increment(items[i]["id"]);
    };
  }
}

function added(idBtn) {
  let cartObj = {
    id: items[idBtn]["id"],
    quantity: 1,
    price: items[idBtn]["price"],
  };
  let currObj = {};
  const keyToSearch = "id";
  const valueToSearch = items[idBtn]["id"];
  const foundObject = cartItems.find(
    (obj) => obj[keyToSearch] === valueToSearch
  );
  const objIndex = cartItems.findIndex(
    (obj) => obj[keyToSearch] === valueToSearch
  );
  if (!foundObject) {
    cartItems.push(cartObj);
    updateListItems("cartList", cartItems);
    currObj[currentMail] = cartItems;
    users = users.filter((user) => !user[currentMail]);
    users.push(currObj);
    updateListItems("userCarts", users);
  } else {
    cartItems[objIndex]["quantity"]++;
    updateListItems("cartList", cartItems);
    currObj[currentMail] = cartItems;
    users.push(currObj);
    updateListItems("userCarts", users);
  }
  totalitems();
  main(items);
}

function decrement(idBtn) {
  const keyToSearch = "id";
  const valueToSearch = items[idBtn]["id"];
  const objIndex = cartItems.findIndex(
    (obj) => obj[keyToSearch] === valueToSearch
  );
  let z = --cartItems[objIndex]["quantity"];
  updateListItems("cartList", cartItems);
  let currObj = {};
  currObj[currentMail] = cartItems;
  users = users.filter((user) => !user[currentMail]);
  if (z === 0) {
    // updateListItems("userCarts", users);
    cartItems.splice(objIndex, 1);
    updateListItems("cartList", cartItems);
    currObj[currentMail] = cartItems;
    users.push(currObj);
    updateListItems("userCarts", users);
  } else {
    users.push(currObj);
    updateListItems("userCarts", users);
  }
  totalitems();
  main(items);
}

function increment(idBtn) {
  const keyToSearch = "id";
  const valueToSearch = items[idBtn]["id"];
  const objIndex = cartItems.findIndex(
    (obj) => obj[keyToSearch] === valueToSearch
  );
  cartItems[objIndex]["quantity"]++;
  updateListItems("cartList", cartItems);
  let currObj = {};
  currObj[currentMail] = cartItems;
  users = users.filter((user) => !user[currentMail]);
  users.push(currObj);
  updateListItems("userCarts", users);
  totalitems();
  main(items);
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

inpText.addEventListener("input", () => {
  let val = inpText.value;
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
      main(htolSorted);
      break;
    case "2":
      let ltohSorted = items.sort((a, b) => Number(a.price) - Number(b.price));
      main(ltohSorted);
      break;
    case "3":
      let arrApple = [];
      items.filter((item) => {
        if (item["productName"].toLowerCase().includes("apple"))
          arrApple.push(item);
      });
      main(arrApple);
      break;
    case "4":
      let arrHuawei = [];
      items.filter((item) => {
        if (item["productName"].toLowerCase().includes("huawei"))
          arrHuawei.push(item);
      });
      main(arrHuawei);
      break;
    case "5":
      let arrDell = [];
      items.filter((item) => {
        if (item["productName"].toLowerCase().includes("dell"))
          arrDell.push(item);
      });
      main(arrDell);
      break;
    case "6":
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
    document.body.style.backgroundColor = "#060608";
    nav[0].style.backgroundColor = "#060608";
    theme.setAttribute("src", "images//sun-solid.svg");
  } else {
    localStorage.setItem("data-theme", "0");
    document.body.style.backgroundColor = "#ffffff";
    nav[0].style.backgroundColor = "#ffffff";
    theme.setAttribute("src", "images//moon-solid.svg");
  }
});

themeProuductPage();
totalitems();
main(items);
