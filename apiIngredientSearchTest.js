const axios = require('axios');
axios({
    url: 'https://api.spoonacular.com/recipes/findByIngredients?apiKey=ac30df0b79dd4751ae614db60f23c6a2&number=5&ingredients=cheddar,onion,bacon',
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