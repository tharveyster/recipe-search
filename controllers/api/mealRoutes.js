const router = require('express').Router();
const { Meal } = require('../../models');

router.get('/', async (req, res) => {
    const mealsData = await Meal.findAll().catch(err) => {
        res.json(err);
    }
});

const meals = mealsData.map((meal) => meal.get({ plain: true }));
res.render('all', { meals });


// finds by meal restrictions
router.findByMeal = (req, res) => {
    const meals = ['breakfast', 'lunch', 'dinner', 'healthy'];
    const mealPref = {};

    meals.forEach(meal => {
        mealPref[meal] = (req.body[meal] == 'TRUE');
    });

    meals.findByMeal(mealPref, req.user.id)
        .then(data => res.json(data))
        .catch(err => console.log('ERROR: findByMeal', err));
};

// Finds recipes by dish options
router.findByDish = (req, res) => {
    meals.findByDish(req.body.choices, req.user.id)
        .then(data => res.json(data))
        .catch(err => console.log('ERROR: findByDish', err));
};

// Creates a new meal entry
router.create = (req, res) => {
    const newMealKeys = ['breakfast', 'lunch', 'dinner', 'healthy'];
    const newMeal = {};

    newMealKeys.forEach(key => {
            newMeal[key] = (req.body[key] == 'true');
    });

    newMeal['dish'] = req.body.dish;

    newMeal['recipe_id'] = req.cookies.recipe;

    meals.create(newMeal, req.user.id)
        .then(data => {
            res.json(data);
        })
        .catch(err => console.log('ERROR: create:', err));
};

// Delete by mealID
router.delete = (req, res) => {
    const mealID = parseInt(req.params.id);
    meals.delete(mealID)
        .then(() => res.json({mealID: mealID}))
        .catch(err => console.log('ERROR: delete', err));
}

// Delete by recipe ID
router.deleteByRecipe = (req, res) => {
    const recipeID = parseInt(req.cookies.recipe);
    meals.deleteByRecipe(recipeID)
        .then(() => {
            res.json({id: recipeID});
        })
        .catch(err => console.log('error: deleteByRecipe', err));
}

module.exports = router;