//Express Server
const express = require("express");
//express layout -- Creating Template
const expressLayout = require("express-ejs-layouts");
//Database
const connectDB = require("./server/models/database");
//FileUpload
const fileUpload = require("express-fileupload");
//Session
const session = require("express-session");
//cookieParser
const cookieParser = require("cookie-parser");
//Flash Messages
const flash = require("connect-flash");

//express app
const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

//Database connection
connectDB();

// Middlewares
app.use(express.urlencoded({ extended: true }));

//static folder setup
app.use(express.static("public"));

//Layout
app.use(expressLayout);

//Cookies
app.use(cookieParser("RecipeBlogSecure"));

//session
app.use(
  session({
    secret: "RecipeBlog",
    saveUninitialized: true,
    resave: true,
  })
);

//flash
app.use(flash());

//file upload
app.use(fileUpload);

//all layout store
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Routes
const routes = require("./server/routes/recipeRoutes.js");
app.use("/", routes);

app.listen(port, (req, res) => {
  console.log("App Started on Port:", port);
});
