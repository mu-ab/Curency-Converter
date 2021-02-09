import uiVars from "./UIVars.js";


// Currency Exchange API Endpoint
const url = "https://www.mycurrency.net/US.json";

// country flag endpoint pseudo-code
const countryFlagEndpoint = "https://www.countryflags.io/:country_code/:style/:size.png"


// UI variables initialization
const UI = uiVars();

// App Entry Point.
document.addEventListener("DOMContentLoaded", () => {

    // To do - Update rate data after every 60 minutes
    setTimeout(function update() {
        getExchangeDetails(url);

        setTimeout(update, 3600000);
    }, 3600000);


    getAndFormatCurrentTime();
    getExchangeDetails(url);
    matchFlagWithCurrency(UI.baseCurrencyCodeElem, UI.fromCountryFlag);
    matchFlagWithCurrency(UI.toCurrencyCodeElem, UI.toCountryFlag);
});





// populates select element with currency codes of countries
function populateSelectElement(selectElement, countriesInfo) {
    countriesInfo.forEach((countryInfo) => {
        let optionElem = new Option(`${countryInfo.currency_code}`, `${countryInfo.code}`);
        optionElem.setAttribute("data-rate", `${countryInfo.rate}`);
        // optionElem.setAttribute("data-currency-name", `${countryInfo.currency_name}`);
        selectElement.add(optionElem);
    });
}

// Gets conversion data
async function getExchangeDetails(url) {
    // To do - show app Loding modal here
    UI.modal.style.display = "block";

    // Hide convert Arrow
    UI.convertArrow.style.display = "none";


    try {
        const exchnageDataPromise = await fetch(url);
        const exchangeData = await exchnageDataPromise.json();

        const { rates } = exchangeData;

        populateSelectElement(UI.baseCurrencyCodeElem, rates);
        populateSelectElement(UI.toCurrencyCodeElem, rates);

        // Show convert Arrow 
        UI.convertArrow.style.display = "block";

        // Hide app loading modal 
        UI.modal.style.display = "none";

    } catch (error) {

        // Hide app loading modal 
        UI.modalLoader.style.display = "none";

        // Show Error message
        UI.modalError.style.display = "block";

    }
}


// match selected currency with it's country's flag
function matchFlagWithCurrency(selectElement, countryFlag) {
    selectElement.addEventListener('change', function (e) {



        // check if flag is available
        // by listening for image onerror event
        countryFlag.addEventListener("error", function (e) {
            showError("Country flag not available, but don't worry, calulations are not affected.", 3500);

        });

        countryFlag.setAttribute("src", `https://www.countryflags.io/${e.target.value}/flat/16.png`);
    })
}

// validate conversion preferences
function arePreferencesValid() {
    const value = Number(UI.baseCurrencyValElem.value);
    const conditionsAreMet = (Number.isFinite(value)) && (value !== 0) && (UI.toCurrencyCodeElem.value !== "")

    if (conditionsAreMet) {
        return true;
    } else {
        return false;
    }
}

// calculate rate
function calculateRate() {

    const amountToConvert = UI.baseCurrencyValElem.value;
    const baseCurrencyRate = UI.baseCurrencyCodeElem.options[UI.baseCurrencyCodeElem.selectedIndex].dataset.rate;

    const toCurrencyRate = UI.toCurrencyCodeElem.options[UI.toCurrencyCodeElem.selectedIndex].dataset.rate;

    // calculates 1 baseCurrency equivalence of toCurrency
    let unitBaseCurrency = ((toCurrencyRate * 1e6 / baseCurrencyRate * 1e6) / (1e6 * 1e6)); // i.e 1 baseCurrency === unitBaseCurrency

    // calculates total amount of toCurrency
    const equivalenceOfToCurrency = ((amountToConvert * 1e6) * (unitBaseCurrency * 1e6) / (1e6 * 1e6)).toFixed(2);

    return {
        equivalenceOfToCurrency,
        unitBaseCurrency
    };
}


// listen for submit Event on form(container)
UI.convertBtn.addEventListener("click", function () {

    // Hide Results
    UI.rateDetailsElem.style.display = "none";

    if (arePreferencesValid()) {

        // show Loader
        UI.loadingGifEl.style.display = "block";

        setTimeout(() => {
            const { equivalenceOfToCurrency, unitBaseCurrency } = calculateRate();
            displayRateDetails(equivalenceOfToCurrency, unitBaseCurrency);

            // Hide loader gif  and Show Results 
            UI.loadingGifEl.style.display = "none";
            UI.rateDetailsElem.style.display = "block";
        }, 2000);

    } else {
        showError("Please Check your preferences.")
    }

});

// Dynamically render rate details
function displayRateDetails(toCurrencyEquivalence, unitBaseCurrencyEquivalence) {

    // Dynamically display currency equivalence
    UI.toCode.textContent = UI.toCurrencyCodeElem.options[UI.toCurrencyCodeElem.selectedIndex].textContent;
    UI.baseCode.textContent = UI.baseCurrencyCodeElem.options[UI.baseCurrencyCodeElem.selectedIndex].textContent;

    // Display unit base rate
    UI.exRateBaseEl.textContent = UI.baseCode.textContent;
    UI.exRateToEl.textContent = `${unitBaseCurrencyEquivalence} ${UI.toCode.textContent}`;

    // Validity period of exchange rate
    UI.fromResultElem.textContent = `${UI.baseCurrencyValElem.value} ${UI.baseCode.textContent} `;
    UI.toresultElem.textContent = `${toCurrencyEquivalence} ${UI.toCode.textContent}`;

}

// custom error function
function showError(message, time = 3000) {
    UI.errorEl.textContent = message;
    UI.errorEl.style.display = "block";
    setTimeout(() => UI.errorEl.style.display = "none", time);
}


// Gets and Displays current time
function getAndFormatCurrentTime() {
    let now = new Date();
    now = now.toDateString();
    UI.dateElem.textContent = now;
}




