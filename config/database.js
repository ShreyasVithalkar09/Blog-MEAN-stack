const mongoose = require("mongoose");
const { MONGODB_URL } = process.env;
mongoose.set("strictQuery", false);
exports.connect = () => {
  mongoose
    .connect(MONGODB_URL, {
      // returns Promise
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DATABASE CONNECTED SUCCESSFULLY"))
    .catch((error) => {
      console.log("DATABASE CONNECTION FAILED");
      console.log(error);
    });
};
