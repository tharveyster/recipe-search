const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#recTitle").textContent;
  const description = document.querySelector("#recDescription").textContent;

  if (title) {
    const response = await fetch(`/api/recipes`, {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/search");
    } else {
      alert("Failed to create recipe");
    }
  }
  console.log("something");
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/recipe/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/search");
    } else {
      alert("Failed to delete recipe");
    }
  }
};

document.querySelector("#btn1").addEventListener("submit", newFormHandler);

document.querySelector("#btn2").addEventListener("click", delButtonHandler);

$(document).ready(function () {
  // Event listener for recipe buttons
  $(".titleBtn").on("click", function () {
    let recipeIdReq = $(this).attr("data-attr");
    document.location.replace(`/search/recipe/${recipeIdReq}`);
  });
});
