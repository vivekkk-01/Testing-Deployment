const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
  },
  email: {
    type: String,
    require: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    require: [true, "Password is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  notifications: {
    type: Array,
    default: [],
  },
  seenNotifications: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
