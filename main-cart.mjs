import user from "./data.json" assert { type: "json" };

const x = JSON.stringify(user);
const items = JSON.parse(x);
const cardGroup = document.getElementById("content");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const currentMail = currentUser[0]["email"];
const get = localStorage.getItem("userCarts");
const cartItems = get
  ? JSON.parse(get).find((ele) => ele[currentMail])[currentMail]
  : [];
let users = JSON.parse(localStorage.getItem("userCarts"));
const totaltext = document.getElementById("total");
let i = 0;
let total = 0;

function updateListItems(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function totalPrice(i) {
  const keyToSearch = "id";
  const valueToSearch = items[i]["id"];
  const objIndex = cartItems.findIndex(
    (obj) => obj[keyToSearch] === valueToSearch
  );
  total =
    total +
    Number(cartItems[objIndex]["price"] * cartItems[objIndex]["quantity"]);
  totaltext.textContent = "Your total : " + total;
}

function totalMinus(i) {
  const keyToSearch = "id";
  const valueToSearch = items[i]["id"];
  const objIndex = cartItems.findIndex(
    (obj) => obj[keyToSearch] === valueToSearch
  );
  total = total - Number(cartItems[objIndex]["price"]);
  console.log(total);
  totaltext.textContent = "Your total : " + total;
}

function addCartBtn(addtocartbtn, i) {
  const keyToSearch = "id";
  const valueToSearch = items[i]["id"];
  const objIndex = cartItems.findIndex(
    (obj) => obj[keyToSearch] === valueToSearch
  );
  cartItems[objIndex]["quantity"]++;
  addtocartbtn.textContent = cartItems[objIndex]["quantity"];
  updateListItems("cartList", cartItems);

  let currObj = {};
  currObj[currentMail] = cartItems;

  users = users.filter((user) => !user[currentMail]);
  users.push(currObj);
  updateListItems("userCarts", users);
  totalPrice(i);
}

function minusCartBtn(addtocartbtn, cartAddbtn, cartMinusbtn, i) {
  const keyToSearch = "id";
  const valueToSearch = items[i]["id"];
  let cardGroupItem = document.getElementById("cardGroupItem".concat(i));
  const objIndex = cartItems.findIndex(
    (obj) => obj[keyToSearch] === valueToSearch
  );
  let z = --cartItems[objIndex]["quantity"];
  totalMinus(i);
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
    cardGroupItem.style.display = "none";
  } else {
    addtocartbtn.textContent = cartItems[objIndex]["quantity"];
    updateListItems("cartList", cartItems);

    let currObj = {};
    currObj[currentMail] = cartItems;
    users = users.filter((user) => !user[currentMail]);
    users.push(currObj);
    updateListItems("userCarts", users);
  }
}

cartItems.forEach((element) => {
  let keyToSearch = "id";
  let valueToSearch = cartItems[i]["id"];
  const objIndex = cartItems.findIndex(
    (obj) => obj[keyToSearch] === valueToSearch
  );
  let j = valueToSearch;

  totalPrice(j);

  const cardGroupItem = document.createElement("div");
  cardGroup.appendChild(cardGroupItem);
  cardGroupItem.style.cssText = `width: 90%;
                                      background-color :#107BD4;
                                      text-align:center;
                                      margin-bottom:10%`;
  cardGroupItem.setAttribute("id", "cardGroupItem".concat(j));

  const cardImg = document.createElement("img");
  cardImg.setAttribute("src", items[j]["image"]);
  cardGroupItem.appendChild(cardImg);
  cardImg.style.cssText = `width: 100%; margin-bottom:5%`;

  const cardText = document.createElement("div");
  cardGroupItem.appendChild(cardText);

  const cardName = document.createElement("h2");
  cardText.appendChild(cardName);
  cardName.textContent = items[j]["productName"];
  cardName.style.cssText = `font-size:1.2rem;
                              font-family: sans-serif;
                              font-weight:600;
                              padding: 0% 5%;
                              color:white`;

  const cardDetails = document.createElement("p");
  cardText.appendChild(cardDetails);
  cardDetails.textContent = items[j]["description"];
  cardDetails.style.cssText = `margin-top :2%;
                                  // text-align:start;
                                  font-family: sans-serif;
                                  font-size:0.8rem;
                                  padding: 0% 10%;
                                  color:white;`;

  const cardPrice = document.createElement("h3");
  cardText.appendChild(cardPrice);
  cardPrice.textContent = "\u20b9".concat(items[j]["price"]);
  cardPrice.style.cssText = `font-weight: 600;
                              margin-top :3%;
                              font-family: sans-serif;
                              color:white;`;

  const cardDiv = document.createElement("div");
  cardText.appendChild(cardDiv);
  cardDiv.style.cssText = `display:flex;justify-content:center `;

  const cardMinusButton = document.createElement("button");
  cardDiv.appendChild(cardMinusButton);
  cardMinusButton.textContent = "-";
  cardMinusButton.style.cssText = `margin:3% 1%;
                                  padding:3%;
                                  font-weight:600;
                                  border:1px solid white;
                                  color:#107BD4;
                                  display:block;
                                  border-radius:2%;`;
  cardMinusButton.setAttribute("class", "cart-minusbtn".concat(j));

  const cardButton = document.createElement("button");
  cardDiv.appendChild(cardButton);
  cardButton.textContent = "Add to Cart";
  cardButton.style.cssText = `margin:3%;
                                  padding:3%;
                                  font-weight:600;
                                  border:1px solid white;
                                  color:#107BD4;
                                  border-radius:2%;`;
  cardButton.setAttribute("class", "cart-btn".concat(j));

  const cardAddButton = document.createElement("button");
  cardDiv.appendChild(cardAddButton);
  cardAddButton.textContent = "+";
  cardAddButton.style.cssText = `margin:3% 1%;
                                  padding:3%;
                                  font-weight:600;
                                  border:1px solid white;
                                  color:#107BD4;
                                  display:block;
                                  border-radius:2%;`;
  cardAddButton.setAttribute("class", "cart-addbtn".concat(j));
  let addtocartbtn = document.getElementsByClassName("cart-btn".concat(j));

  addtocartbtn[0].textContent = cartItems[objIndex]["quantity"];
  i++;
});

cardGroup.addEventListener("click", function (event) {
  let i = 0;

  cartItems.forEach((ele) => {
    let keyToSearch = "id";
    let valueToSearch = cartItems[i]["id"];
    let j = valueToSearch;

    let cartMinusbtn = document.getElementsByClassName(
      "cart-minusbtn".concat(j)
    );
    let cartAddbtn = document.getElementsByClassName("cart-addbtn".concat(j));
    let addtocartbtn = document.getElementsByClassName("cart-btn".concat(j));

    if (event.target.classList.contains("cart-addbtn".concat(j))) {
      addCartBtn(addtocartbtn[0], j);
    }

    if (event.target.classList.contains("cart-minusbtn".concat(j))) {
      minusCartBtn(addtocartbtn[0], cartAddbtn[0], cartMinusbtn[0], j);
    }
    i++;
  });
});
