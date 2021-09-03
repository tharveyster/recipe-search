const axios = require('axios');
axios({
    url: 'https://api.spoonacular.com/recipes/1095687/information?apiKey=cdc0392ab6dd4303a4494aa61b2244e0',    method: 'GET',
  }).then((response) => {
      const recipe = response.data;
      const steps = [];
      const ingredients = [];
      recipe.analyzedInstructions[0].steps.forEach(item => {
          steps.push(item.step);
      })
      recipe.extendedIngredients.forEach(item => {
        ingredients.push(item.original);
      })
      console.log(ingredients);
      console.log(steps);
  })