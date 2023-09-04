// Models
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");
/*
 * GET/ *
 * Homepage -- index.ejs*
 */

exports.homepage = async (req, res) => {
  try {
    //DB Query to Grad categories
    //Only 5 categories can Display
    const limitNumber = 5;
    // Categories Data
    const categories = await Category.find({}).limit(limitNumber);
    // Recipe Data
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);

    //Filter By category
    const thai = await Recipe.find({ category: "Thai" }).limit(limitNumber);
    const american = await Recipe.find({ category: "American" }).limit(
      limitNumber
    );
    const chinese = await Recipe.find({ category: "Chinese" }).limit(
      limitNumber
    );

    const food = { latest, thai, chinese, american };
    res.render("index", { title: "Recipe Blog - Homepage", categories, food });
  } catch (error) {
    // console.log(error);
    res.send("An error Occured::");
  }
};

/*
 * GET/categories *
 * Homepage --categories.ejs*
 */

exports.exploreCategories = async (req, res) => {
  try {
    //DB Query to Grag categories
    //Only 5 categories can Display
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    res.render("categories", {
      title: "Recipe Blog - Categories page",
      categories,
    });
  } catch (error) {
    // console.log(error);
    res.send("An error Occured::");
  }
};

/*
 * GET/recipes *
 * Homepage --recipe.ejs*
 */

exports.exploreRecipe = async (req, res) => {
  try {
    //DB Query to display each Recipe
    //1. Find Id
    //2. Then Render

    let recipeId = req.params.id;

    const recipe = await Recipe.findById(recipeId);
    res.render("recipe", {
      title: "Recipe Blog - Recipe page",
      recipe,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send("An error Occured::");
  }
};
