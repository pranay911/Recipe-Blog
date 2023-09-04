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
    //DB Query to Grab categories
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
 * GET/categories/:id *
 * Homepage --categories.ejs*
 */

exports.exploreCategoriesByID = async (req, res) => {
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await Recipe.find({ category: categoryId }).limit(
      limitNumber
    );
    res.render("categories", {
      title: "Cooking Blog - Categoreis",
      categoryById,
    });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });
  }
};

/*
 * GET/recipe/:id *
 * Homepage --recipe.ejs*
 */

exports.exploreRecipe = async (req, res) => {
  try {
    //DB Query to display each Recipe By ID
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

/*
 * POST/search *
 * Search --search.ejs*
 */

exports.searchRecipe = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipe.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    });
    // res.json(recipe);
    res.render("search", {
      title: "Recipe Blog - Search page",
      recipe,
    });
  } catch (error) {
    res.status(500).send("An error Occured::");
  }
};

/*
 * GET/explore-latest *
 * Explore Latest --explore-latest.ejs*
 */

exports.exploreLatest = async (req, res) => {
  try {
    const limitNumber = 5;

    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    // res.json(recipe);
    res.render("explore-latest", {
      title: "Recipe Blog - Explore Latest",
      recipe,
    });
  } catch (error) {
    res.status(500).send("An error Occured::");
  }
};

/*
 * GET/explore-random *
 * Explore Random --explore-random.ejs* AS JSON
 */

exports.exploreRandom = async (req, res) => {
  try {
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);

    const recipe = await Recipe.findOne().skip(random).exec();
    // res.json(recipe);
    res.render("explore-random", {
      title: "Recipe Blog - Explore Random",
      recipe,
    });
  } catch (error) {
    res.status(500).send("An error Occured::", error);
  }
};

/*
 * GET/submit-recipe *
 * Submit Recipe --submit-recipe.ejs*
 */
exports.submitRecipe = async (req, res) => {
  const infoErrorObj = req.flash("infoErrors");
  const infoSubmitObj = req.flash("infoSubmit");

  res.render("submit-recipe", {
    title: "Recipe Blog - Submit Recipe",
    infoErrorObj,
    infoSubmitObj,
  });
};

/*
 * POST/submit-recipe *
 * Submit Recipe --submit-recipe.ejs*
 */
exports.submitRecipeOnPost = async (req, res) => {
  try {
    // File Upload
    let imageUploadFile;
    let uploadPath;
    let newImageName;
    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No files where uploaded.");
    } else {
      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;
      uploadPath =
        require("path").resolve("./") + "/public/uploads/" + newImageName;
      imageUploadFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
      });
    }

    //Added data in DB
    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName,
    });
    await newRecipe.save();
    req.flash("infoSubmit", "Recipe has been Added.");
    res.redirect("/submit-recipe");
  } catch (error) {
    req.flash("infoErrors", error);
  }
};
