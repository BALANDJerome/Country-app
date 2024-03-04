// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
// coutry.name.includes(inputSearch.value);

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays

// .map((country)=>`
// <div class="card>

// </div>
// `)
const inputSearch = document.getElementById("inputSearch");
const result = document.querySelector(".countries-container");
let countries = [];
let inputValue = 24;

fetchCountry = async () => {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countries = data));
  countryDisplay();
};

countryDisplay = () => {
  result.innerHTML = `<ul>${countries
    .filter((country) =>
      country.translations.fra.common.includes(inputSearch.value)
    )
    // .sort((a, b) => {
    //   if () {
    //     return a - b;
    //   } else if () {
    //     return b - a;
    //   }
    // })
    .slice(0, inputValue)
    .map(
      (country) =>
        `
    <li>
      <img src=${country.flags.png} alt="photo ${country.flags.alt}">
      <h2>${country.translations.fra.common}</h2>
      <h3>${country.capital}</h3>
      <p>Population : ${country.population}</p>
    </li>
  `
    )
    .join("")}</ul>`;
};

inputSearch.addEventListener("input", (e) => {
  countryDisplay();
});
inputRange.addEventListener("input", (e) => {
  inputValue = inputRange.value;
  rangeValue.textContent = `${inputValue}`;
  countryDisplay();
});

fetchCountry();
