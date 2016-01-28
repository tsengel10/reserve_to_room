var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userService = require("../services/userService")


var userSchema = new Schema({
	firstName: {type: String, required: "Please enter your first name."},
	lastName: {type: String, required: "Please enter your last name."},
	roomNumber: {type: Number, required: "Please enter your room number.", min: [100, "Not valid room number (Min: 100)."]},
	email: {type: String, required: "Please enter your email address."},
	password: {type: String, required: "Please enter your password."},
	created: {type: Date, default: Date.now}
});

userSchema.path("email").validate(function(value, next){
	userService.findUser(value, function(err, user){
		if(err){
			console.log(err);
			return next(false);
		}
		next(!user);
	});
}, "The email is already registered.");

var User = mongoose.model("user", userSchema);

module.exports = {
	User: User
};

