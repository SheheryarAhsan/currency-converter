const URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";

const dropdowns = document.querySelectorAll(".dropdown select");

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
}