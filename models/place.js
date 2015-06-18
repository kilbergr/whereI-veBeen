var mongoose = require("mongoose");
mongoose.createConnection("mongodb://localhost/placesIveTraveled");

module.exports.Place = require("./place");