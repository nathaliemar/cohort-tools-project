const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
});
module.exports = model("User", UserSchema);
