const router = require("express").Router();
const { Recipe, User } = require("../models");
const withAuth = require("../utils/auth");
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    // Get all recipes and JOIN with user data
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      recipes,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/recipes/:id", async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    if (!recipeData) {
      res.render("404");
      return;
    }

    const recipe = recipeData.get({ plain: true });

    res.render("recipes", {
      ...recipe,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/search", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Recipe }],
    });

    const user = userData.get({ plain: true });

    res.render("search", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/cookbook", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Recipe }],
    });

    const user = userData.get({ plain: true });

    res.render("cookbook", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/cookbook");
    return;
  }

  res.render("login");
});

router.get("/search/recipe", (req, res) => {
  axios({
    baseURL: "",
    url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=874778f77da94c2a8144b9799fd2ae6e&query=${encodeURIComponent(
      req.query.search
    )}&number=10`,
    method: "GET",
  })
    .then((response) => {
      const recipes = response.data.results;
      const cleanRecipes = recipes.map((recipe) => {
        return {
          id: recipe.id,
          title: recipe.title,
        };
      });
      //res.json(cleanRecipes);
      res.render("search", {
        cleanRecipes: cleanRecipes,
        logged_in: req.session.logged_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occured.");
    });
});

router.get("/search/ingredient", (req, res) => {
  axios({
    baseURL: "",
    url: `https://api.spoonacular.com/recipes/findByIngredients?apiKey=874778f77da94c2a8144b9799fd2ae6e&number=10&ingredients=${req.query.search}`,
    method: "GET",
  })
    .then((response) => {
      const recipes = response.data;
      const cleanRecipes = recipes.map((recipe) => {
        return {
          id: recipe.id,
          title: recipe.title,
        };
      });
      //res.json(cleanRecipes);
      res.render("search", {
        cleanRecipes: cleanRecipes,
        logged_in: req.session.logged_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occured.");
    });
});

router.get("/search/recipe/:id", (req, res) => {
  axios({
    baseURL: "",
    url: `https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=874778f77da94c2a8144b9799fd2ae6e`,
    method: "GET",
  })
    .then((response) => {
      const recipe = response.data;
      const steps = [];
      const ingredients = [];
      recipe.analyzedInstructions[0].steps.forEach((item) => {
        steps.push(item.step);
      });
      recipe.extendedIngredients.forEach((item) => {
        ingredients.push(item.original);
      });
      const cleanRecipe = {
        steps,
        ingredients,
        id: recipe.id,
        title: recipe.title,
        description: recipe.summary,
      };
      //res.json(cleanRecipe);
      res.render("recipe", {
        id: cleanRecipe.id,
        title: cleanRecipe.title,
        ingredients: cleanRecipe.ingredients,
        steps: cleanRecipe.steps,
        description: cleanRecipe.description,
        logged_in: req.session.logged_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occured.");
    });
});

module.exports = router;
