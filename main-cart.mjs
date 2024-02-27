import user from "./data.json" assert { type: "json" };

const stringUser = JSON.stringify(user);
const items = JSON.parse(stringUser);
const cardGroup = document.getElementById("content");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const currentMail = currentUser[0]["email"];
const get = localStorage.getItem("userCarts");
const cartItems = get
  ? JSON.parse(get).find((ele) => ele[currentMail])[currentMail]
  : [];
let users = JSON.parse(localStorage.getItem("userCarts"));
const totaltext = document.getElementById("total");
let idSearch = 0;
let total = 0;

function updateListItems(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function totalPrice(idSearch) {
  const keyToSearch = "id";
  const valueToSearch = items[idSearch]["id"];
  const objIndex = cartItems.findIndex(
    (obj) => obj[keyToSearch] === valueToSearch
  );
  total = total + Number(cartItems[objIndex]["price"] * cartItems[objIndex]["quantity"]);
  totaltext.textContent = "Your total : " + total;
}

function totalMinus(idSearch) {
  const keyToSearch = "id";
  const valueToSearch = items[idSearch]["id"];
  const objIndex = cartItems.findIndex(
    (obj) => obj[keyToSearch] === valueToSearch
  );
  total = total - Number(cartItems[objIndex]["price"]);
  console.log(total);
  totaltext.textContent = "Your total : " + total;
}

function addCartBtn(addtocartbtn, idSearch) {
  const keyToSearch = "id";
  const valueToSearch = items[idSearch]["id"];
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
  totalPrice(idSearch);
}

function minusCartBtn(addtocartbtn, cartAddbtn, cartMinusbtn, idSearch) {
  const keyToSearch = "id";
  const valueToSearch = items[idSearch]["id"];
  let cardGroupItem = document.getElementById("cardGroupItem".concat(idSearch));
  const objIndex = cartItems.findIndex(
    (obj) => obj[keyToSearch] === valueToSearch
  );
  let removeValue = --cartItems[objIndex]["quantity"];
  totalMinus(idSearch);
  if (removeValue === 0) {
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
  let valueToSearch = cartItems[idSearch]["id"];
  const objIndex = cartItems.findIndex(
    (obj) => obj[keyToSearch] === valueToSearch
  );
  let searchValue = valueToSearch;

  totalPrice(searchValue);

  const cardGroupItem = document.createElement("div");
  cardGroup.appendChild(cardGroupItem);
  cardGroupItem.classList.add("itemContainer")
  cardGroupItem.setAttribute("id", "cardGroupItem".concat(searchValue));

  const cardImg = document.createElement("img");
  cardImg.setAttribute("src", items[searchValue]["image"]);
  cardGroupItem.appendChild(cardImg);
  cardImg.classList.add('itemContainerImg');

  const cardText = document.createElement("div");
  cardGroupItem.appendChild(cardText);

  const cardName = document.createElement("h2");
  cardText.appendChild(cardName);
  cardName.textContent = items[searchValue]["productName"];
  cardName.classList.add('itemContainerName')

  const cardDetails = document.createElement("p");
  cardText.appendChild(cardDetails);
  cardDetails.textContent = items[searchValue]["description"];
  cardDetails.classList.add("itemContainerDetails");

  const cardPrice = document.createElement("h3");
  cardText.appendChild(cardPrice);
  cardPrice.textContent = "\u20b9".concat(items[searchValue]["price"]);
  cardPrice.classList.add('itemContainerPrice');

  const cardDiv = document.createElement("div");
  cardText.appendChild(cardDiv);
  cardDiv.classList.add('itemContainerBtn')

  const cardMinusButton = document.createElement("button");
  cardDiv.appendChild(cardMinusButton);
  cardMinusButton.textContent = "-";
  cardMinusButton.setAttribute("class", "cart-minusbtn".concat(searchValue));
  cardMinusButton.classList.add('itemContainerMinus')
  cardMinusButton.style.display = "block"

  const cardButton = document.createElement("button");
  cardDiv.appendChild(cardButton);
  cardButton.textContent = "Add to Cart";
  cardButton.setAttribute("class", "cart-btn".concat(searchValue));
  cardButton.classList.add('itemContainerBtns')

  const cardAddButton = document.createElement("button");
  cardDiv.appendChild(cardAddButton);
  cardAddButton.textContent = "+";
  cardAddButton.setAttribute("class", "cart-addbtn".concat(searchValue));
  cardAddButton.classList.add('itemContainerAdd');
  cardAddButton.style.display = "block"
  let addtocartbtn = document.getElementsByClassName("cart-btn".concat(searchValue));
  addtocartbtn[0].textContent = cartItems[objIndex]["quantity"];
  idSearch++;
});

cardGroup.addEventListener("click", function (event) {
  let indexs = 0;

  cartItems.forEach((ele) => {
    let keyToSearch = "id";
    let valueToSearch = cartItems[indexs]["id"];
    let searchId = valueToSearch;

    let cartMinusbtn = document.getElementsByClassName(
      "cart-minusbtn".concat(searchId)
    );
    let cartAddbtn = document.getElementsByClassName("cart-addbtn".concat(searchId));
    let addtocartbtn = document.getElementsByClassName("cart-btn".concat(searchId));

    if (event.target.classList.contains("cart-addbtn".concat(searchId))) {
      addCartBtn(addtocartbtn[0], searchId);
    }

    if (event.target.classList.contains("cart-minusbtn".concat(searchId))) {
      minusCartBtn(addtocartbtn[0], cartAddbtn[0], cartMinusbtn[0], searchId);
    }
    indexs++;
  });
});
