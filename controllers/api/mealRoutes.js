const router = require('express').Router();
const { Meal } = require('../../models');


const  = {};

// finds all the meals
controller.findAll = (req, res) => {
    meals.findAll(req.user.id)
        .then(data => res.json(data))
        .catch(err => console.log('ERROR: findAll', err));
};

// finds by meal restrictions
controller.findByMeal = (req, res) => {
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
controller.findByDish = (req, res) => {
    meals.findByDish(req.body.choices, req.user.id)
        .then(data => res.json(data))
        .catch(err => console.log('ERROR: findByDish', err));
};

// Creates a new meal entry
controller.create = (req, res) => {
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
controller.delete = (req, res) => {
    const mealID = parseInt(req.params.id);
    meals.delete(mealID)
        .then(() => res.json({mealID: mealID}))
        .catch(err => console.log('ERROR: delete', err));
}

// Delete by recipe ID
controller.deleteByRecipe = (req, res) => {
    const recipeID = parseInt(req.cookies.recipe);
    meals.deleteByRecipe(recipeID)
        .then(() => {
            res.json({id: recipeID});
        })
        .catch(err => console.log('error: deleteByRecipe', err));
}

module.exports = controller;