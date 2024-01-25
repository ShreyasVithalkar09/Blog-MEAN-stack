const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // hunt for token
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    token = req.cookies.token || req.body.token;
  }

  if (!token || token == "") {
    return res.status(403).send("Token is missing");
  }

  if (token.includes("Bearer")) {
    token = token.replace("Bearer ", "");
  }

  // verify the token
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decode);
    req.user = decode;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};

module.exports = auth;
