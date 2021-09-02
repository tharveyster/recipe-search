const axios = require('axios');
axios({
    url: 'https://api.spoonacular.com/recipes/complexSearch?apiKey=cdc0392ab6dd4303a4494aa61b2244e0&query=figs&number=5',
    method: 'GET',
}).then((response) => {
    const recipes = response.data.results;
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


module.exports(Recipe, User);