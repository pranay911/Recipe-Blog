const mongoose = require("mongoose");
//Schema
const categorySchema = new mongoose.Schema({
  //DB Values
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  //   name: {
  //     type: String,
  //     required: true,
  //   },
  //   name: {
  //     type: String,
  //     required: true,
  //   },
});

module.exports = mongoose.model("Category", categorySchema);
