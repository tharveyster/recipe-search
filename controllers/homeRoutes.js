const router = require('express').Router();
const { Recipe, User } = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    // Get all recipes and JOIN with user data
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      recipes,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/recipe/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const recipe = recipeData.get({ plain: true });

    res.render('recipe', {
      ...recipe,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Recipe }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/search/recipe', (req,res)=> {
  console.log(req.query.search)
  //res.send(req.query.search)

  
  axios({
    baseURL: '',  
    url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=ac30df0b79dd4751ae614db60f23c6a2&query=${encodeURIComponent( req.query.search )}&number=5`,
      method: 'GET',
    }).then((response) => {
        const recipes = response.data.results;
        console.log(recipes)
        const cleanRecipes = recipes.map(recipe => {
          return {
            id:recipe.id,
            title:recipe.title
          }
        })
        //res.json(cleanRecipes);
        res.render('profile', {
          cleanRecipes: cleanRecipes,
          logged_in: req.session.logged_in
        });
    }).catch(err => {
      console.log(err)
      res.status(500).send("An error occured.")
    })
})

router.get('/search/ingredient', (req,res)=> {
  console.log(req.query.search)
  //res.send(req.query.search)
  
  axios({
    baseURL: '',  
    url: `https://api.spoonacular.com/recipes/findByIngredients?apiKey=cdc0392ab6dd4303a4494aa61b2244e0&number=5&ingredients=${req.query.search}`,
      method: 'GET',
    }).then((response) => {
        const recipes = response.data;
        console.log(recipes)
        const cleanRecipes = recipes.map(recipe => {
          return {
            id:recipe.id,
            title:recipe.title
          }
        })
        //res.json(cleanRecipes);
        res.render('profile', {
          cleanRecipes: cleanRecipes,
          logged_in: req.session.logged_in
        });
    }).catch(err => {
      console.log(err)
      res.status(500).send("An error occured.")
    })
})

router.get('/search/recipe/:id', (req,res)=> {
  console.log(req.params.id)
  console.log(`https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=cdc0392ab6dd4303a4494aa61b2244e0`)
  //res.send(req.query.search)

  
  axios({
      baseURL: '',
      url: `https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=cdc0392ab6dd4303a4494aa61b2244e0`,
      method: 'GET',
    }).then((response) => {
      const recipe = response.data;
      const steps = [];
      const ingredients = [];
      recipe.analyzedInstructions[0].steps.forEach(item => {
          steps.push(item.step);
      })
      recipe.extendedIngredients.forEach(item => {
        ingredients.push(item.original);
      })
      const cleanRecipe = {
        steps,
        ingredients,
        id:recipe.id,
        title:recipe.title,
        description:recipe.summary
      };
        //res.json(cleanRecipe);
        res.render('recipe', {
          title: cleanRecipe.title,
          ingredients: cleanRecipe.ingredients,
          steps: cleanRecipe.steps,
          description: cleanRecipe.description,
          logged_in: req.session.logged_in
        });
      }).catch(err => {
      console.log(err)
      res.status(500).send("An error occured.")
    })
})

module.exports = router;
