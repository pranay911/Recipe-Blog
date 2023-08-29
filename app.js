//Express Server
const express = require("express");
//express layout -- Creating Template
const expressLayout = require("express-ejs-layouts");

//express app
const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

// Middlewares
app.use(express.urlencoded({ extended: true }));

//static folder setup
app.use(express.static("public"));

//Layout
app.use(expressLayout);

//all layout store
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Routes
const routes = require("./server/routes/recipeRoutes.js");
app.use("/", routes);

app.listen(port, (req, res) => {
  console.log("App Started on Port:", port);
});
