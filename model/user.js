const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    default: null,
    required: true,
  },
  email: {
    type: String,
    default: null,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
