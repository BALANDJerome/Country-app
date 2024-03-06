// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays

const inputSearch = document.getElementById("inputSearch");
const result = document.querySelector(".countries-container");
const buttons = document.querySelectorAll(".btnSort");
let countries = [];
let inputValue = 24;
let min, max, alpha;

fetchCountry = async () => {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countries = data));
  countryDisplay();
};

countryDisplay = () => {
  result.innerHTML = countries
    .filter((country) =>
      country.translations.fra.common.includes(inputSearch.value)
    )
    .sort((a, b) => {
      if (min || max) {
        return min ? a.population - b.population : b.population - a.population;
      } else if (alpha) {
        // return a.translations.fra.common > b.translations.fra.common ? 1 : -1;
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common,
          "fr",
          {
            ignorePunctuation: true,
          }
        );
      }
    })
    .slice(0, inputValue)
    .map(
      (country) =>
        `
    <div class="card">
      <img src=${country.flags.png} alt="photo ${country.flags.alt}">
      <h2>${country.translations.fra.common}</h2>
      <h3>${country.capital}</h3>
      <p>Population : ${country.population}</p>
    </div>
  `
    )
    .join("");
};

inputSearch.addEventListener("input", (e) => {
  countryDisplay();
});

inputRange.addEventListener("input", (e) => {
  inputValue = inputRange.value;
  rangeValue.textContent = `${inputValue}`;
  countryDisplay();
});

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    switch (e.target.id) {
      case "minToMax":
        min = true;
        max = false;
        alpha = false;
        break;
      case "maxToMin":
        min = false;
        max = true;
        alpha = false;
        break;
      case "alpha":
        min = false;
        max = false;
        alpha = true;
        break;
      default:
        nul;
    }
    countryDisplay();
  });
});

fetchCountry();
