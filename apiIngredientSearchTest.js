const axios = require('axios');

var searchBtn2 = document.getElementById("btn2");


function ingredientSearch() {
  axios({
      url: 'https://api.spoonacular.com/recipes/findByIngredients?apiKey=cdc0392ab6dd4303a4494aa61b2244e0&number=5&ingredients=cheddar,onion,bacon',
      method: 'GET',
    }).then((response) => {
        const recipes = response.data;
        const titles = [];
        const ids = [];
        recipes.forEach(recipeTitle => {
          titles.push(recipeTitle.title);
        })
        recipes.forEach(recipeId => {
          ids.push(recipeId.id);
        })
        for (i = 0; i < titles.length; i++) {
          console.log(ids[i]);
          console.log(titles[i]);
        };
    })
}
searchBtn2.addEventListener("click", ingredientSearch)