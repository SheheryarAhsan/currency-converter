const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const date = document.querySelector(".date");


// On first time loading page
window.addEventListener("load", () => {
    updateExchangeRate();
})

// Dropdown Functionality (Adding Country Code & Currency Code)
for (let select of dropdowns) {
    for (currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        select.append(newOption);
        if (select.name === "from" && currencyCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currencyCode === "PKR") {
            newOption.selected = "selected";
        }
    }
    select.addEventListener("change", (event) => {
        updateFlag(event.target)
    });
}

// Changing Flags of Countries as per selection
const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// Currency Conversion
btn.addEventListener("click",(event) => {
    event.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;

    if(amountValue === "" || amountValue < 1) { // Preventing from inputting negative and zero value
        amountValue = 1;
        amount.value = "1";
    }

    let lowerFromCountry = fromCurrency.value.toLowerCase();
    let lowerToCountry = toCurrency.value.toLowerCase();
    const URL = `${baseURL}/${lowerFromCountry}.json`;
    let reponse = await fetch(URL);
    let data = await reponse.json();
    let rate = data[`${lowerFromCountry}`][`${lowerToCountry}`];

    let finalAmount = rate*amountValue;
    msg.innerText = `Result: ${amountValue} ${fromCurrency.value} = ${finalAmount.toFixed(5)} ${toCurrency.value}`;
    date.innerText =`Updated On: ${data.date}`;
}