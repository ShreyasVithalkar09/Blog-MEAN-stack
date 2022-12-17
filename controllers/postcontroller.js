const Post = require("../model/post");
const format = require("date-format");

const getPosts = async (req, res) => {
  const posts = await Post.find();
  // const author = req.query.author;
  // if (author) {
  //   let author_posts = await Post.find({ author });
  //   res.status(200).json(author_posts);
  // } else {
  res.status(200).json(posts);
  // }
};

const getUsersPosts = async (req, res) => {
  const posts = await Post.find();
  const author = req.query.author;
  if (author && req.user.username === author) {
    let author_posts = await Post.find({ author });
    res.status(200).json(author_posts);
  } else {
    res.status(200).json(posts);
  }
};

const createPost = async (req, res) => {
  try {
    const { title, description, category, author } = req.body;

    if (!(title && description && category && author)) {
      res.status(400).json({
        msg: "All fields are required",
      });
    }

    if (req.user.username === author) {
      const post = await Post.create({
        title,
        description,
        category,
        author,
        datetime: format.asString("dd/MM/yyyy hh:mm:ss", new Date()),
      });
      res.status(201).json(post);
    } else {
      res.status(403).json({
        msg: "User is Unauthorized",
      });
    }
  } catch (error) {
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

    const id = req.params.id;

    if (req.user.username === author) {
      const post = await Post.findByIdAndUpdate(id, {
        title,
        description,
        category,
        author,
      });
      res.status(200).json(post);
    } else {
      res.status(403).json({
        msg: "User is Unauthorized",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    const post = await Post.findById(id);
    const author = post.author;

    if (req.user.username === author) {
      await Post.findByIdAndDelete(id, function (err, doc) {
        if (err) {
          res.status(400).json({
            msg: "Post not found",
          });
          console.log(err);
        } else {
          res.status(400).json({
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
