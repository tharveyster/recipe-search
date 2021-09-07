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