const multer = require("multer");
const path = require("path");

// Multer storage configuration for serverless environment
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Saving files in the /tmp directory
    cb(null, '/tmp');
  },
  filename: (req, file, cb) => {
    // Generating a unique file name
    const fileName = `${Math.floor(Math.random() * 1e9)}-${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

// Multer upload instance
const upload = multer({ storage });

module.exports = upload;
