// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays

const inputSearch = document.getElementById("inputSearch");
const result = document.querySelector(".countries-container");
let countries = [];
let inputValue = 24;
let min, max;

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
      if (min) {
        return a.population - b.population;
      } else if (max) {
        return b.population - a.population;
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
minToMax.addEventListener("click", () => {
  min = 1;
  max = null;
  countryDisplay();
});
maxToMin.addEventListener("click", () => {
  min = null;
  max = 1;
  countryDisplay();
});

fetchCountry();
