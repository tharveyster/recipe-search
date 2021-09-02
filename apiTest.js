const axios = require('axios');
axios({
    url: 'https://api.spoonacular.com/recipes/complexSearch?apiKey=ac30df0b79dd4751ae614db60f23c6a2&query=zucchini&number=2&includeIngredients=true&addRecipeInformation=true&fillIngredients=true',
    method: 'GET',
  }).then((response) => {
      const recipe = response.data.results[0]
      const steps = []
      const ingredients = []
      recipe.analyzedInstructions[0].steps.forEach(item => {
          steps.push(item.step);
      })
      recipe.extendedIngredients.forEach(item => {
        ingredients.push(item.original);
      })
      console.log(recipe.title);
      console.log(ingredients);
      console.log(steps);
  })




  

