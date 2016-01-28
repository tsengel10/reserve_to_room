var express = require('express');
var router = express.Router();
var userService = require("../services/userService");
var passport = require("passport");
var config = require("../config");

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/create', function(req, res, next) {
	var view_model = {
		title: "Create an account"
	}
	res.render("users/create", view_model);
});

router.post('/create', function(req, res, next) {

	userService.addUser(req.body, function(err){
		if(err){	
			console.log(err);
			var view_model = {
				title: "Create an account",
				input: req.body,
				error: err
			};
			delete view_model.input.password;
			return res.render("users/create", view_model);
		}
		//after creating a user, log user in
		req.login(req.body, function(err){
			res.redirect("/orders")
		});
	});
});

router.post('/login', function(req, res, next){
	req.session.orderId = 12345;
	if(req.body.rememberMe){
		req.session.cookie.maxAge = config.cookieMaxAge;
	}
	next();
},
passport.authenticate("local", {
	failureRedirect: "/", 
	successRedirect: "/orders",
	failureFlash: "Invalid credentials"

}));

router.get('/logout', function(req, res, next){
	req.logout();
	req.session.destroy();
	res.redirect("/");
});


module.exports = router;
