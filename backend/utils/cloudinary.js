const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
// Configuration

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const fileDestroyOnCloudinary = async (fileId) => {
  if (!fileId) {
    console.log("Please provide a file public_id");
  } else {
    await cloudinary.uploader.destroy(fileId);
    console.log("file deleted successfully");
  }
};

const fileUploadOnCloudinary = async (localFilePath) => {
  try {
    console.log("i am clooudinary");
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
  }
};

module.exports = {
  fileUploadOnCloudinary,
  fileDestroyOnCloudinary,
};
