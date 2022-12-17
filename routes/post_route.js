const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getPosts,
  getUsersPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postcontroller");

router.get("/", getPosts);
router.get("/userposts", auth, getUsersPosts);
router.post("/create", auth, createPost);
router.get("/:postID", getPostById);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

module.exports = router;
