const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const fileupload = async (req) => {
  console.log(req.files.blogfile);
  let file = req.files.blogfile;

  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "posts",
  });

  const postImage = {
    public_id: result.public_id,
    secure_url: result.secure_url,
  };

  return postImage;
};

module.exports = fileupload;
