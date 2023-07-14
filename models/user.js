const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const UserSchema = new Schema({
  Email: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  EmailAuth:{
  type: Boolean
  }
});
module.exports = user = mongoose.model("Users", UserSchema);
