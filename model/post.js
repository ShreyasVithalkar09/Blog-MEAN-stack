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

  blogImage: {
    public_id: {
      type: String,
      default: null,
      required: true,
    },
    secure_url: {
      type: String,
      default: null,
      required: true,
    },
  },

  datetime: {
    type: String,
    default: null,
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
