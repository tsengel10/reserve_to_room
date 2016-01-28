var express = require('express');
var router = express.Router();
var restrict = require("../auth/restrict");

/* GET home page. */

//restrict is located in auth folder and 
//only can access to this url when authenticated
router.get('/', restrict, function(req, res, next) {
	var view_model = {
		title: "Place an order",
		firstName: req.user ? req.user.firstName : null,
		orderId: req.session.orderId
	}
	res.render('orders/index', view_model);
});

module.exports = router;
