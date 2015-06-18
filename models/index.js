var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/placesIveTraveled");

module.exports.Place = require("./place");