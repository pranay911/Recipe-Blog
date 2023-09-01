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

    const food = { latest };
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
    //DB Query to Grad categories
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
