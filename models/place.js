var mongoose = require("mongoose");

var placeSchema = new mongoose.Schema({
  address: String,
  lat: Number,
  long: Number
});

var Place = mongoose.model("Place", placeSchema);

module.exports = Place;