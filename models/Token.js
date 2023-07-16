const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TokenSchema = new Schema({
  Email: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  Token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expireAfterSeconds: 1800,// this is the expiry time in seconds
  },
});
module.exports = mongoose.model("Token", TokenSchema);