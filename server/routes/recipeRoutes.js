const express = require("express");
//Main Router
//Router setup
const router = express.Router();

//Recipe controller
const recipeController = require("../controllers/recipeController");

/* *
 **App Routes::HomePage**
 * */
router.get("/", recipeController.homepage);
router.get("/categories", recipeController.exploreCategories);
router.get("/categories/:id", recipeController.exploreCategoriesByID);
router.get("/recipe/:id", recipeController.exploreRecipe);
router.get("/explore-latest", recipeController.exploreLatest);
router.get("/explore-random", recipeController.exploreRandom);

router.post("/search", recipeController.searchRecipe);

module.exports = router;
