// Models
const Category = require("../models/Category");

/*
 * GET/ *
 * Homepage *
 */

exports.homepage = async (req, res) => {
  res.render("index", { title: "Recipe Blog - Homepage" });
};

async function insertDummyCategoryData() {
  try {
    await Category.insertMany([
      {
        name: "American",
        image: "american-food.jpg",
      },
      {
        name: "Chinese",
        image: "chinese-food.jpg",
      },
      {
        name: "Thai",
        image: "thai-food.jpg",
      },
      {
        name: "Mexican",
        image: "mexican-food.jpg",
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}
insertDummyCategoryData();
// module.exports = insertDummyCategoryData;
