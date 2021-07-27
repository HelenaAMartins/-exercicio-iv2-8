const templateDrinkData = (drink) => {
  const {
    strDrink,
    idDrink,
    strAlcoholic,
    strCategory,
    strDrinkThumb,
    strGlass,
    strInstructions,
  } = drink;
  let ingredients = [];
  let measures = [];

  let templateIngredients =
    '<div class="drinkCard"><h3>Ingredients</h3><div class="ingredientsList">';

  for (let i = 1; i < 15; i++) {
    let textIngredient = `strIngredient${i}`;
    let ingredient = drink[textIngredient];
    let textMeasure = `strMeasure${i}`;
    let measure = drink[textMeasure];

    if (ingredient !== null && ingredient !== "" && measure !== null && measure !== "") {
      templateIngredients += `<div class="ingredientsGrid">
      <div>${ingredient}</div>
      <div>${measure}</div>
      </div>
      `;
    }
  }

  templateIngredients += "</div></div>";

  return `<div class="drinkCard grid">
            <div class="thumb">
              <img src="${strDrinkThumb}">
            </div>
            <div class="infos">
              <small>${idDrink}</small>
              <h2>${strDrink}</h2>
              <p>Type: ${strAlcoholic}</p>
              <p class="category">Category: ${strCategory}</p>
              <p>Glass type: ${strGlass}</p>
            </div> 
          </div>
          ${templateIngredients}
          <div class="drinkCard">
            <h3>How to make</h3>
            <p>${strInstructions}</p>
          </div>`;
};

const showData = async (id) => {
  const response = await fetchData(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const drinkData = response.drinks[0];

  let template = '<div class="drinksInfoCard">';
  
  template += templateDrinkData(drinkData);
  template += "</div>";
  populateMain(".modalTarget", template);
  modal.style.display = "block";
};
