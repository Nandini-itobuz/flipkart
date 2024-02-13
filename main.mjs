import user from "./data.json" assert { type: 'json' };
import cartdata from "./cart.json" assert { type: 'json' };

import { create } from "./cards.mjs";

const x=JSON.stringify(user);
const items=JSON.parse(x);

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

const cardGroup = document.getElementById("content");
setList("cartList", cartdata);
const cartItems = JSON.parse(localStorage.getItem("cartList"));

const total= document.getElementById("cart-num");
function totalitems(){
  let totalCartItem = cartItems.length;
total.textContent = totalCartItem;
if(totalCartItem >=1 ){
  total.style.display = "block";
}
else{
  total.style.display = "none";
}
}

totalitems();

for (let i = 0; i < 8; i++) {
  const cardGroupItem = document.createElement("div");
  cardGroup.appendChild(cardGroupItem);
  cardGroupItem.style.cssText = `width: 90%;
                                      background-color :#107BD4;
                                      text-align:center;
                                      margin-bottom:10%`;
  cardGroupItem.setAttribute("id", "cardGroupItem".concat(i));

  const cardImg = document.createElement("img");
  cardImg.setAttribute("src", items[i]["image"]);
  cardGroupItem.appendChild(cardImg);
  cardImg.style.cssText = `width: 100%; margin-bottom:5%`;

  const cardText = document.createElement("div");
  cardGroupItem.appendChild(cardText);

  const cardName = document.createElement("h2");
  cardText.appendChild(cardName);
  cardName.textContent = items[i]["productName"];
  cardName.style.cssText = `font-size:1.2rem;
                              font-family: sans-serif;
                              font-weight:600;
                              padding: 0% 5%;
                              color:white`;

  const cardDetails = document.createElement("p");
  cardText.appendChild(cardDetails);
  cardDetails.textContent = items[i]["description"];
  cardDetails.style.cssText = `margin-top :2%;
                                  // text-align:start;
                                  font-family: sans-serif;
                                  font-size:0.8rem;
                                  padding: 0% 10%;
                                  color:white;`;

  const cardPrice = document.createElement("h3");
  cardText.appendChild(cardPrice);
  cardPrice.textContent = "\u20b9".concat(items[i]["price"]);
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
                                  display:none;
                                  border-radius:2%;`;
  cardMinusButton.setAttribute("class", "cart-minusbtn".concat(i));

  const cardButton = document.createElement("button");
  cardDiv.appendChild(cardButton);
  cardButton.textContent = "Add to Cart";
  cardButton.style.cssText = `margin:3%;
                                  padding:3%;
                                  font-weight:600;
                                  border:1px solid white;
                                  color:#107BD4;
                                  border-radius:2%;`;
  cardButton.setAttribute("class", "cart-btn".concat(i));

  const cardAddButton = document.createElement("button");
  cardDiv.appendChild(cardAddButton);
  cardAddButton.textContent = "+";
  cardAddButton.style.cssText = `margin:3% 1%;
                                  padding:3%;
                                  font-weight:600;
                                  border:1px solid white;
                                  color:#107BD4;
                                  display:none;
                                  border-radius:2%;`;
  cardAddButton.setAttribute("class", "cart-addbtn".concat(i));

                                  

}


function centerCartBtn(cartAddbtn, cartMinusbtn, addtocartbtn, i) {
  cartAddbtn.style.display = "block";
  cartMinusbtn.style.display = "block";
  let cartObj = {"id": items[i]["id"],  "quantity":1}
  const keyToSearch = 'id';
  const valueToSearch = items[i]["id"];
  const foundObject = cartItems.find(obj => obj[keyToSearch] === valueToSearch);
  const objIndex = cartItems.findIndex(obj => obj[keyToSearch] === valueToSearch);
  if(!foundObject){
    addtocartbtn.textContent = 1;
    cartItems.push(cartObj);
  }
  else{
  cartItems[objIndex]["quantity"]++;
  addtocartbtn.textContent =cartItems[objIndex]["quantity"] ;
  updateListItems("cartList",cartItems);
  }
  updateListItems("cartList",cartItems);
  totalitems();
}

function addCartBtn(addtocartbtn, i) {
  const keyToSearch = 'id';
  const valueToSearch = items[i]["id"];
  const objIndex = cartItems.findIndex(obj => obj[keyToSearch] === valueToSearch);
  cartItems[objIndex]["quantity"]++;

  addtocartbtn.textContent = cartItems[objIndex]["quantity"];
  updateListItems("cartList",cartItems);
  totalitems();

}

function minusCartBtn(addtocartbtn, cartAddbtn, cartMinusbtn, i) {
  const keyToSearch = 'id';
  const valueToSearch = items[i]["id"];
  const objIndex = cartItems.findIndex(obj => obj[keyToSearch] === valueToSearch);
  let z = --cartItems[objIndex]["quantity"];
  
  if(z<=0 ){
    cartItems[objIndex]["quantity"] = 0;
    addtocartbtn.textContent = "Add to cart";
    cartAddbtn.style.display = "none";
    cartMinusbtn.style.display = "none";
    updateListItems("cartList",cartItems);
    cartItems.splice(objIndex,1);
    updateListItems("cartList",cartItems);
  }
  else{
    addtocartbtn.textContent = cartItems[objIndex]["quantity"];
    updateListItems("cartList",cartItems);
  }
  totalitems();
}


cardGroup.addEventListener("click", function (event) {
  for (let i = 0; i < 8; i++) {
    let cartMinusbtn = document.getElementsByClassName(
      "cart-minusbtn".concat(i)
    );
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