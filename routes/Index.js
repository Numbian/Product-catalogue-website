const express = require("express");
const router = express.Router({mergeParams:true}); 
const passport = require("passport");
const User = require ("../models/User");
const controller = require("./../controllers/index.js");
const middleware = require("./../middleware/index.js");


router.get("/", controller.renderHomePage);


router.get("/contact", controller.renderContactForm);

// auth routes
router.get("/register", controller.renderRegisterForm);

//register nnew user route and thenn log in
router.post("/register", controller.registerNewUser);  


router.post("/login", controller.logInUser); 


router.get("/login", controller.renderLoginForm);

router.get("/logout", middleware.isLoggedIn, controller.logOutUser);


router.get("/admin", middleware.isLoggedIn, controller.renderAdminPanel);




module.exports = router;