const recipeList = JSON.parse(localStorage.getItem("recipeList")) || [];
console.log(localStorage)

const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#get-recipe').value;
    const cuisine = document.querySelector('#recipe-list').value;
  
    if (title) {

     
      const response = await fetch(`/api/recipe`, {
        method: 'POST',
        body: JSON.stringify({ title, cuisine }),
        headers: {
          'Content-Type': 'application/json',
        },

      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create recipe');
      }
    }
console.log("something")

  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/recipe/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete recipe');
      }
    }
  };

 
  document
    .querySelector('#btn1')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('#btn2')
    .addEventListener('click', delButtonHandler);
  
