require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const { PORT } = process.env;
const post_routes = require("./routes/post_route");
const user_routes = require("./routes/user_route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ["http://localhost:4200", "http://127.0.0.1:4200"] }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  next();
});
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/posts", post_routes);
app.use("/users", user_routes);
app.listen(PORT, () => console.log(`Server running at port ${PORT}....`));
