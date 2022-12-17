const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET_KEY } = process.env;

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(username && email && password)) {
      res.status(400).json({
        msg: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(401).json({
        msg: "User already exists!",
      });
    }

    // password encryption
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // jwt token
    const token = await jwt.sign({ user_id: user._id, email }, SECRET_KEY, {
      expiresIn: "2h",
    });

    user.token = token;

    // handling password
    user.password = undefined;
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).json({
        msg: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (user && bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { user_id: user._id, username: user.username },
        SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      // password handling
      user.password = undefined;

      // if you want to use cookies
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
      });
    }
  } catch (error) {
    res.status(400).send("Invalid email or password!");
    console.log(error);
  }
};

module.exports = { createUser, loginUser };
