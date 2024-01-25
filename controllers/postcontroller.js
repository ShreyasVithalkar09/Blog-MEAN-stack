const Post = require("../model/post");
const format = require("date-format");
const cloudImageUpload = require("../middleware/fileupload");

const getPosts = async (req, res) => {
  const posts = await Post.find();
  const category = req.query.category;
  if (category) {
    let categoryposts = await Post.find({ category });
    res.status(200).json(categoryposts);
  } else {
    res.status(200).json(posts);
  }
};

const getUsersPosts = async (req, res) => {
  // if (req.coo) {
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    // const posts = await Post.find();
    const author = req.query.author;
    if (author && req.user.username === author) {
      let author_posts = await Post.find({ author });
      res.status(200).json(author_posts);
    } else {
      res.status(200).json({ msg: "No posts to show" });
    }
  } else {
    res.status(403).json({
      msg: "Unauthorized User",
    });
  }
};

const createPost = async (req, res) => {
  try {
    let token = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    const { title, description, category, author } = req.body;

    if (!(title && description && category && author)) {
      res.status(400).json({
        msg: "All fields are required",
      });
    }

    // call for cloudinary image upload

    const blogImage = await cloudImageUpload(req);

    if (token && req.user.username === author) {
      const post = await Post.create({
        title,
        description,
        category,
        author,
        blogImage,
        datetime: format.asString("dd/MM/yyyy hh:mm:ss", new Date()),
      });
      res.status(201).json({ success: true, post });
    } else {
      res.status(403).json({
        msg: "User is Unauthorized",
      });
    }
  } catch (error) {
    res.json({ success: false, err: "Something went wrong" });
    console.log(error);
  }
};

const getPostById = async (req, res) => {
  const id = req.params.postID;
  const post = await Post.findById(id);

  res.status(200).json(post);
};

const updatePost = async (req, res) => {
  try {
    const { title, description, category, author } = req.body;
    if (!(title && description && category && author)) {
      res.status(400).json({
        msg: "All fields are required",
      });
    }

    let token = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    const id = req.params.id;

    if (token && req.user.username === author) {
      const post = await Post.findByIdAndUpdate(id, {
        title,
        description,
        category,
        author,
      });
      res.status(200).json({ success: true, post });
    } else {
      res.status(403).json({
        msg: "User is Unauthorized",
      });
    }
  } catch (error) {
    res.json({ success: false, err: "Something went wrong" });
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    let token = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    const post = await Post.findById(id);
    const author = post.author;

    if (token && req.user.username === author) {
      await Post.findByIdAndDelete(id, function (err, doc) {
        if (err) {
          res.status(400).json({
            success: false,
            msg: "Post not found",
          });
          console.log(err);
        } else {
          res.status(200).json({
            success: true,
            msg: "Post deleted",
          });
        }
      });
    } else {
      res.status(403).json({
        msg: "User is Unauthorized",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  getUsersPosts,
};
