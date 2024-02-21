const BASE_URL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies`;
let dropdowns = document.querySelectorAll(".dropdown select");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let conv_Currency = document.querySelector("#conv-Currency");
let ticContainer = document.querySelector("#ticContainer");
let scissorContainer = document.querySelector("#scissorContainer");
let currency_Conv = document.querySelector("#currencyContainer");
let selectService = document.querySelector("#selectService");
let select_Service = document.querySelectorAll(".select_Service");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    // console.log(currCode);
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && currCode === "NPR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    // console.log(evt.target.value);
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  // console.log(countryCode);
  let SRC = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = SRC;
};

let concertCurrency = document.querySelector("#convertCurrency");
concertCurrency.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amt = document.querySelector(".amount input");
  // console.log(amt);
  let amtVal = amt.value;
  // console.log(amtVal);
  // console.log("clicked")
  if (amtVal === "" || amtVal < 0) {
    amtVal = 1;
    amt.value = "1";
  }
  let URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let responce = await fetch(URL);
  // console.log(responce)
  let data = await responce.json();
  // console.log(data);
  let rate = await data[toCurr.value.toLowerCase()];
  let finalAmount = amtVal * rate;
  conv_Currency.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});

select_Service.forEach((selected) => {
  selected.addEventListener("click", (evt) => {
    let serviceChoose = selected.getAttribute("id");

    if (serviceChoose === "game1") {
      ticContainer.classList.remove("hide");
    } else if (serviceChoose === "game2") {
      scissorContainer.classList.remove("hide");
    } else {
      currency_Conv.classList.remove("hide");
    }
  });
});
