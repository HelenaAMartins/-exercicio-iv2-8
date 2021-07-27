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
const searchDrink = async(param) =>{  
  
  const response = await fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${param}`)
  
  let template = '<div class="drinksInfoList">'

  for(let i = 0; i < response.drinks.length; i++){
    template += templateDrink(response.drinks[i])

  }
  template += "</div>";
  populateMain('.container', template)
}




