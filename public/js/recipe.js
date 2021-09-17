const recipeFormHandler = async (event) => {
  event.preventDefault();

  // Get the content of the recipe results
  const title = document.querySelector("#recTitle").textContent;
  const description = document.querySelector("#recDescription").textContent;
  const ingredients = document.querySelector("#recIngredients").innerHTML;
  const steps = document.querySelector("#recSteps").innerHTML;
  const recipe_id = location.pathname.split('/')[3];

  // If the form was not empty post the recipe
  if (title) {
    const response = await fetch("/api/recipes", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        ingredients,
        steps,
        recipe_id,
      }),
      headers: { "Content-Type": "application/json" },
    });

    // If successful go to the cookbook page
    if (response.ok) {
      document.location.replace("/cookbook");
    } else {
      alert(response.statusText);
    }
  }
};

const cancelFormHandler = async (event) => {
  event.preventDefault();

  location = document.referrer;
};

document.querySelector("#saveBtn").addEventListener("click", recipeFormHandler);
document
  .querySelector("#cancelBtn")
  .addEventListener("click", cancelFormHandler);
