const deleteFormHandler = async (event) => {
  event.preventDefault();

  // Get the recipe id from the url
  const recipe_id = location.pathname.split('/')[2];

  // Send a DELETE request to the API end point
  const response = await fetch(`/api/recipes/${recipe_id}`, {
    method: 'DELETE',
    body: JSON.stringify({ recipe_id: recipe_id }),
    headers: { 'Content-Type': 'application/json' }
  });

  // If successful return the browser to the dashboard
  if (response.ok) {
    document.location.replace('/cookbook');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#deleteRecipeBtn').addEventListener('click', deleteFormHandler);