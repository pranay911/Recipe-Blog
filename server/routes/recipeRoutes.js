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
module.exports = router;
