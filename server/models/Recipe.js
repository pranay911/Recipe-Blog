const mongoose = require("mongoose");
//Schema
const recipeSchema = new mongoose.Schema({
  //DB Values
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    enum: ["Thai", "American", "Chinese", "Indian", "Mexican"],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

recipeSchema.index({ name: "text", description: "text" });
// Wildcard Indexing

module.exports = mongoose.model("Recipe", recipeSchema);
