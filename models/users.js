var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var path = require("path");
mongoose.connection.on('open', function() {
  console.log("Mongoose connected!");
});
var userSchema = new Schema({
    username: { type: String },
    password: { type: String },
    admin: {type: Boolean},
});
var  User = mongoose.model('User', userSchema);
var users = new User();
module.exports = {
users:users,
User:User
}