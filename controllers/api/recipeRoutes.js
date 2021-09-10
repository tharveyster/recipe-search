const router = require("express").Router();
const { Recipe } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: User,
          attributes: ["user_id"],
        },
      ],
    });

    const recipe = recipeData.map((recipe) => {
      recipe.get({ plain: true });
    });

    res.render("cookbook", {
      recipe,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      ...req.body,
      title: req.body.title,
      description: req.body.description,
      ingredients: req.body.ingredients,
      steps: req.body.steps,
      user_id: req.session.user_id,
    });

    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!recipeData) {
      res.status(404).json({ message: "No recipe found with this id!" });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
