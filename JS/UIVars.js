
// UI variables
export default function uiVars() {
    // Error div
    const errorEl = document.querySelector(".error");

    // Date Element
    const dateElem = document.querySelector(".date");

    // Base currency wrapper
    const baseCurrencyValElem = document.querySelector(".base-currency-value");
    const baseCurrencyDivElem = document.querySelector(".base-currency");
    const baseCurrencyCodeElem = document.querySelector(".base-currency-selectbox");

    // conversion Arrow
    const convertArrow = document.querySelector(".conversion-icon");

    // To currency
    const toCurrencyCodeElem = document.querySelector(".to-currency");

    // convert button
    const convertBtn = document.querySelector(".convert");

    // Country flags
    const fromCountryFlag = document.querySelector(".from-country-flag");
    const toCountryFlag = document.querySelector(".to-country-flag");

    // Rate Details
    const rateDetailsElem = document.querySelector(".rate-details");
    const baseCode = document.querySelector(".base-currency-code");
    const toCode = document.querySelector(".to-currency-code");
    const fromResultElem = document.querySelector('.from-result');
    const toresultElem = document.querySelector(".to-result");
    const exRateBaseEl = document.querySelector(".Ex-rate .base");
    const exRateToEl = document.querySelector(".Ex-rate .to");

    // Loading Gif
    const loadingGifEl = document.querySelector(".loading-gif img");

    // Modal
    const modal = document.querySelector('.modal');

    // Modal Loader
    const modalLoader = document.querySelector(".modal-loader");

    // Modal Error
    const modalError = document.querySelector(".modal-error");

    return {
        errorEl,
        dateElem,
        baseCurrencyValElem,
        baseCurrencyDivElem,
        baseCurrencyCodeElem,
        convertArrow,
        toCurrencyCodeElem,
        convertBtn,
        fromCountryFlag,
        toCountryFlag,
        rateDetailsElem,
        exRateBaseEl,
        exRateToEl,
        baseCode,
        toCode,
        fromResultElem,
        toresultElem,
        loadingGifEl,
        modal,
        modalLoader,
        modalError
    };
}