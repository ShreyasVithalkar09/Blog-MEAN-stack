require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const { PORT } = process.env;
const post_routes = require("./routes/post_route");
const user_routes = require("./routes/user_route");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/posts", post_routes);
app.use("/users", user_routes);
app.listen(PORT, () => console.log(`Server running at port ${PORT}....`));
