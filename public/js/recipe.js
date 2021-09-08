
  const newRecipe = () => {
      // name, image, url
      const recipe = {};
      recipe['name'] = $('h1').text();
      recipe['url'] = $('.sourceURL').attr('href');
      const recipeOptions = ['vegetarian', 'vegan', 'dairyFree', 'glutenFree', 'ketogenic', 'healthy'];
      recipeOptions.forEach(option => {
          recipe[option] = ($('#'+ option).val() === "true");
      });
      recipe['image'] = $('#image').val();
      recipe['spoonacular_id'] = $('#spoonacular_id').val();

      return recipe;
  }

  const editRecipe = () => {
      const recipe = {};
      const recipeOptions = ['vegetarian', 'vegan', 'dairyFree', 'glutenFree', 'ketogenic', 'healthy', 'name', 'url', 'image', 'spoonacular_id'];
      recipeOptions.forEach(option => {
          if($('#'+option).val() === "true" || $('#'+option).val() === "false"){
              recipe[option] = ($('#'+option).val() === "true");
          } else {
              recipe[option] = $('#'+option).val();
          } 
      });

      return recipe;
  }


  $('#save').submit(e => {
      e.preventDefault();

      const recipeData = newRecipe();

      $.ajax({
          method: 'POST',
          url: '/api/recipes/new/',
          data: recipeData,
          success: recipe => {
              location.replace('/planning/user/recipes/' + recipe.id);
          },
          error: error => {
              console.log('Error:', error);
          }
      })
  });

  
const bodyParser = require("body-parser");

const getIngredients = async () => {
    const response = await fetch('./recipe.handlebars', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  
  document.getElementById('btn1').addEventListener('click', getIngredients);
  

  const getTitle = async () => {
    const response = await fetch('/api/users/title', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  
  document.getElementById('btn2').addEventListener('click', getTitle);
