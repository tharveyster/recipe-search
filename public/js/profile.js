const recipeList = JSON.parse(localStorage.getItem("recipeList")) || [];
console.log(localStorage)


document.querySelector("#btn1").addEventListener("click", function (event) {
    event.preventDefault();

    const recipeName = document.querySelector("#get-recipe").value.trim();

    const searchObject = {
        recipe: recipeName,
    }
console.log(searchObject)

recipeList.push(searchObject)
localStorage.setItem("recipeList", JSON.stringify(recipeList));
    // if (recipe === "") {
    //     return;
    // }
   
     newFormHandler(recipeName);

   
});




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

  const getIngredients = async (event) => {
    event.preventDefault();
    console.log("something")

    const ingredientName = document.querySelector('#ingredients');
    const ingredientEl = [];
    const ingredientObj = {
      ingredient: ingredientName,
    }

    ingredientObj.push(ingredientEl)
    
    
      document.querySelector('#email-login').value.trim();
     
         const response = await fetch('/api/users/ingedients', {
           method: 'GET',
           headers: { 'Content-Type': 'application/json' },
         });
     
         if (response.ok) {
           document.location.replace('/');
         } else {
           alert(response.statusText);
         }
       };
    
    
    

  
<<<<<<< HEAD
document.getElementById('btn1').addEventListener('click', newFormHandler);

document.getElementById('btn2').addEventListener('click', delButtonHandler);
=======
  document
    .querySelector('#btn1')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('#btn2')
    .addEventListener('click', delButtonHandler);
  
>>>>>>> 5f051b4916d83bbc6b5c8b9e33dc1d4ccc5658e9
