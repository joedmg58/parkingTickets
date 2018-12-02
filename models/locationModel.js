var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var locationSchema = new Schema({
  name: { type: String, required: true },
  coordinates: { lat: Number, lon: Number }
});

var User = mongoose.model("Location", locationSchema);

module.exports = Location;