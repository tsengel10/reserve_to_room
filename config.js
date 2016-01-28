var config = {};

//rtr is db name
//Restaurant To Room
config.mongoUri = "mongodb://localhost:27017/rtr"
config.cookieMaxAge = 30 * 24 * 3600 * 1000;

module.exports = config;