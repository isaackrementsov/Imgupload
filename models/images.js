var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var path = require("path");
mongoose.connection.on('open', function() {
  console.log("Mongoose connected!");
});
var imageSchema = new Schema({
    title: { type: String },
    filename: { type: String },
    folder: {type: String},
    mimetype: {type: String},
    size: {type: Number}
});
var  Image = mongoose.model('Image', imageSchema);
var images = new Image();
module.exports = {
images:images,
Image:Image
}