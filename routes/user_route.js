const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  logout,
} = require("../controllers/usercontroller");

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/logout", logout);

module.exports = router;
