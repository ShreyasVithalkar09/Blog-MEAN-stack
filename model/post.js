const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    default: null,
    required: true,
  },
  description: {
    type: String,
    default: null,
    required: true,
  },

  //TODO image_url

  category: {
    type: String,
    default: null,
    required: true,
  },

  author: {
    type: String,
    default: null,
    required: true,
  },

  datetime: {
    type: String,
    default: null,
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
