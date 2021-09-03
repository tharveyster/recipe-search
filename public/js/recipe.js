const getIngredients = async () => {
    const response = await fetch('/api/users/recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  
  document.querySelector('#ingredients').addEventListener('click', getRecipe);
  

  const getTitle = async () => {
    const response = await fetch('/api/users/title', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  
  document.querySelector('#title').addEventListener('click', getRecipe);
  