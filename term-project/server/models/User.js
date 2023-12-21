const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true },
  email: { type: String, unique: true },
  dob: { type: Date },
  gender: { type: String, enum: ["male", "female", "other"] },
  address: { type: String },
  phoneNumber: { type: String },
  city: { type: String },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;