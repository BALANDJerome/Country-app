const inputSearch = document.getElementById("inputSearch");
const result = document.querySelector(".countries-container");
const buttons = document.querySelectorAll(".btnSort");
let countries = [];
let min, max, alpha;

fetchCountry = async () => {
  //await fetch("https://restcountries.com/v3.1/all")
  await fetch(
    "https://restcountries.com/v3.1/all?fields=translations,flags,population"
  )
    .then((res) => res.json())
    .then((data) => (countries = data));

  console.log(countries);

  countryDisplay();
};

countryDisplay = () => {
  result.innerHTML = countries
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .sort((a, b) => {
      if (min || max) {
        return min ? a.population - b.population : b.population - a.population;
      } else if (alpha) {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .slice(0, inputRange.value)
    .map(
      (country) =>
        `
    <div class="card">
      <img src=${country.flags.png} alt="drapeau ${country.flags.alt}">
      <h2>${country.translations.fra.common}</h2>
      <h3>${country.capital}</h3>
      <p>Population : ${country.population.toLocaleString()}</p>
    </div>
  `
    )
    .join("");
};

inputSearch.addEventListener("input", countryDisplay);

inputRange.addEventListener("input", (e) => {
  rangeValue.textContent = `${inputRange.value}`;
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
