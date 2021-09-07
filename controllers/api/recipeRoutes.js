const router = require('express').Router();
const { Recipe } = require('../../models');
const withAuth = require('../../utils/auth');


// router.get('/', async (req, res) => {
 
// // Recipe.findOne()
// //   const id = req.params.id;

// //   recipe.findOne(id, req.user.id) 
// // .then(data => {
// //   res.json(data);
// // })
// //   .catch(err => console.log('Error: FindOne:', err))
// }


router.findByDiet = (req, res) => {
  const choices = ['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'ketogenic'];
  const myDiet = {};
  choices.forEach(choice => {
    myDiet[choice] = (req.body[choice] == 'TRUE');
  });

  recipe.findByDiet(myDiet, req.user.id)
  .then(data => {
    res.json(data);
  })
  .catch(err => console.log('Error: FindOne:', err))
}

router.create = (req, res) => {
  const inputVariables = ['name', 'image', 'vegetarian', 'vegan', 'glutenFree', 'dairyFree', 'ketogenic', 'healthy', 'url', 'spoonacular_id'];
  const newReciepe = {};
  inputVariables.forEach(variable => {
    newReciepe[variable] = req.body[variable];
  });

    recipe.create(newRecipe, req.user.id)
    .then(recipeData => {
      res.json(recipeData);
    })
    .catch(err => console.log('Error: new recipe:', err));

}

router.post('/', withAuth, async (req, res) => {
  try {
    const newReciepe = await Recipe.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newReciepe);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!recipeData) {
      res.status(404).json({ message: 'No recipe found with this id!' });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
