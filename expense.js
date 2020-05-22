const delBtn = document.querySelector(".delete");
const numberEl = document.querySelectorAll(".number");
const itemName = document.querySelector("#item-name");
const itemAmount = document.querySelector("#item-amount");
const btn = document.querySelector("#add-btn");
const ulList = document.querySelector(".history-list");
const list = document.querySelectorAll(".list");
let green = document.querySelector(".green");
let red = document.querySelector(".red");
let balance = document.querySelector("#balance");
const str = "$";

//balance update function
function balanceUpdate() {
  balance.innerHTML =
    "$" +
    (parseFloat(green.innerHTML, 10) + parseFloat(red.innerHTML, 10)).toFixed(
      2
    );
}

//add li function and updating income expense function
function addLi(e) {
  e.preventDefault();

  let li = document.createElement("li");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  const span3 = document.createElement("span");

  span3.innerText = "X";
  span1.innerText = itemName.value;
  span2.innerText = itemAmount.value;

  span3.classList.add("delete");
  span1.classList.add("item");
  span2.classList.add("number");
  li.classList.add("list");

  ulList.appendChild(li);
  li.appendChild(span3);
  li.appendChild(span1);
  li.appendChild(span2);

  var sum = 0;
  var num = 0;

  if (itemAmount.value.slice(0, 1) == "-") {
    span2.classList.add("numberElement");
    const numberElement = document.querySelectorAll(".numberElement");
    $.each(numberElement, function (value) {
      var itemValue = parseFloat(numberElement[value].innerHTML);
      sum += !isNaN(itemValue) ? itemValue : 0;
    });
    red.innerHTML = sum.toFixed(2);
  }
  if (itemAmount.value.slice(0, 1) == "+") {
    li.style.borderRight = "7px solid greenyellow";
    span2.classList.add("added");
    const numberClass = document.querySelectorAll(".added");
    $.each(numberClass, function (value) {
      var numValue = parseFloat(numberClass[value].innerHTML);
      num += !isNaN(numValue) ? numValue : 0;
    });
    green.innerHTML = num.toFixed(2);
  }

  balanceUpdate();

  itemName.value = "";
  itemAmount.value = "";
}

//delete function
function delFunction(e) {
  if (e.target.className == "delete") {
    const line = e.target.parentElement;
    ulList.removeChild(line);
    var yoo = line.querySelector("span:nth-child(3)");
    let yooInt = parseInt(yoo.innerHTML, 10);
    if (line.style.borderRight == "7px solid greenyellow") {
      let greenInt = parseInt(green.innerHTML, 10);
      greenInt -= yooInt;
      green.innerHTML = greenInt;
      balanceUpdate();
    } else {
      let redInt = parseInt(red.innerHTML, 10);
      redInt -= yooInt;
      red.innerHTML = redInt;
      balanceUpdate();
    }
  }
}

//event listeners
btn.addEventListener("click", addLi);
ulList.addEventListener("click", delFunction);
