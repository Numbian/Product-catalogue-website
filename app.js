const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const controller = require("./controllers/product.js")
const flash = require("connect-flash");
const categoriesList = require("./categories.js");
const fileUpload = require('express-fileupload');


//aurentykacja i logowanine
var passport = require("passport");
var LocalStrategy = require("passport-local");

// modele mongoose do bazy danych
var Products = require("./models/Product");
var User = require("./models/User");


// konfiguracja passport passport-local
app.use(require("express-session")({
	secret: "Dawno dawno temu",
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MongoDB po³¹czenie
mongoose.connect("mongodb://localhost/DirectVent",  { useNewUrlParser: true });

// konfiguracja apki // middlewares
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.static('downloads'));
app.use(flash());
app.use(fileUpload());


//global function middleware!
app.use(function(req,res,next){
	res.locals.currentUser = req.user;

    res.locals.allCategories = categoriesList;

	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})

///wywalennie routów do osobnych plików
var categoriesRoutes = require("./routes/Products");
app.use(categoriesRoutes);
var indexRoutes = require("./routes/Index");
app.use(indexRoutes);


app.listen(8080, function(){console.log("Server started")});