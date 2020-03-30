var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    name : String,
    email : String,
    googleId : String,
    facebookId : String
})

const userColection = mongoose.model("User", userSchema);

module.exports = userColection