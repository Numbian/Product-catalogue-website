const User = require ("../models/User");
const passport = require("passport");
var controller = []
var Products = require("./../models/Product");

controller.renderRegisterForm = (req, res,next) => res.render("register");

controller.renderHomePage = (req, res,next) => res.render("home");



controller.registerNewUser = (req, res, next) => {
		   	   var newUser = new User({username: req.body.username, email:req.body.email})
			   User.register(newUser, req.body.password, function (err,user){
			   if(err){
				   console.log(err)
				   req.flash("error",err.message)
				   return res.redirect("register")
	           }
	               passport.authenticate("local")(req,res,function(){
	          	   res.redirect("/categories")
	           });
	       })
}

controller.renderLoginForm = (req, res,next) => res.render('login');

controller.logInUser = passport.authenticate("local", {
		                    successRedirect:"/categories",
						    failureRedirect:"/login",
					    }), function(req, res, next){
					    };


controller.logOutUser = (req, res) => {
  req.logout();
  res.redirect('categories');
}


controller.renderAdminPanel = (req, res,next) => {
	
 		   Products.find({}, (err, allProducts) => {
		   if(err){
		   console.log(err);
		   req.flash("error",err.message)
		   return res.redirect("/categories/all")

		   } else {
	       res.render('admin', {products: allProducts});
           }
})
}

controller.renderContactForm = (req, res,next) => res.render('contact');

module.exports = controller;


