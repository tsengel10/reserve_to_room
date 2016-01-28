var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	if(req.user){
		return res.redirect("/orders");
	}

	var view_model = {
		title: "Login",
		error: req.flash("error")
	};
	
	res.render('index', view_model);
});

router.get('/view', function(req, res, next) {
	res.send("blahblah");
});

module.exports = router;
