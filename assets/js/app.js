const populateMain = (target, template) => {
  const newTarget = document.querySelector(target);
  newTarget.innerHTML = ""
  newTarget.innerHTML = template;
}

const fetchData = (endpoint) => {
  const response = fetch(endpoint).then(res => res.json());
  return response
}

const templateDrink = (drink) => { 
  console.log(drink)
  const {strDrinkThumb, strDrink, idDrink, strAlcoholic, strGlass} = drink;
    return `<div class="drinksDetails" onclick="showData(${idDrink})">
    <figure class="smallThumb">
    <img src="${strDrinkThumb || "https://via.placeholder.com/500x500.png?text=Image+unavailable"}" />
    </figure>
    <div class="drinksDetailsHead">
      <small>ID: ${idDrink}</small>
      <h3>${strDrink}</h3>
      <p>Type: ${strAlcoholic}</p>
      <p>Glass: ${strGlass}</p>
    </div>
    </div>
      `
}

const templateDrinkData = (drink) => {
  const {strDrink, idDrink, strAlcoholic, strCategory, strDrinkThumb, strGlass, strInstructions} = drink;
  let ingredients = [];
  let measures = [];

  let templateIngredients = '<div class="drinkCard"><h3>Ingredients</h3><div class="ingredientsList">';

  for(let i = 1; i < 15; i++){
    let textIngredient = `strIngredient${i}`
    let ingredient = drink[textIngredient]
    let textMeasure = `strMeasure${i}`
    let measure = drink[textMeasure]

    if(ingredient != null && measure != null){
      templateIngredients += `<div class="ingredientsGrid">
      <div>${ingredient}</div>
      <div>${measure}</div>
      </div>
      `
    }
  }

  templateIngredients += '</div></div>'

  console.log(ingredients, measures);
  
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
          </div>`
}

const searchDrink = async(param) =>{  
  const response = await fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${param}`)
  console.log(response);
  let template = '<div class="drinksInfoList">'

  for(let i = 0; i < response.drinks.length; i++){
    template += templateDrink(response.drinks[i])

  }
  template += "</div>";
  populateMain('.container', template)
}

const showData = async(id) => {
  const response = await fetchData(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
  const drinkData = response.drinks[0]
  
  
  let template = '<div class="drinksInfoCard">'
console.log(drinkData)
  
  template += templateDrinkData(drinkData)
 
  

  
  template += "</div>";
  populateMain('.container', template)
}


