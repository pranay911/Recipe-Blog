// Models
const Category = require("../models/Category");

/*
 * GET/ *
 * Homepage -- index.ejs*
 */

exports.homepage = async (req, res) => {
  try {
    //DB Query to Grad categories
    //Only 5 categories can Display
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    res.render("index", { title: "Recipe Blog - Homepage", categories });
  } catch (error) {
    // console.log(error);
    res.send("An error Occured::");
  }
};

// async function insertDummyCategoryData() {
//   try {
//     await Category.insertMany([
//       {
//         name: "American",
//         image: "american-food.jpg",
//       },
//       {
//         name: "Chinese",
//         image: "chinese-food.jpg",
//       },
//       {
//         name: "Thai",
//         image: "thai-food.jpg",
//       },
//       {
//         name: "Mexican",
//         image: "mexican-food.jpg",
//       },
//       {
//         name: "Indian",
//         image: "indian-food.jpg",
//       },
//       {
//         name: "Spanish",
//         image: "spanish-food.jpg",
//       },
//     ]);
//   } catch (error) {
//     console.log(error);
//   }
// }
// insertDummyCategoryData();
// module.exports = insertDummyCategoryData;

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
    res.render("categories", { title: "Recipe Blog - Categories page", categories });
  } catch (error) {
    // console.log(error);
    res.send("An error Occured::");
  }
};