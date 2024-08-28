// middleware/multer.js

const multer = require("multer");
const path = require("path");
const fs = require("fs");

console.log("i am from multer");
// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: (req, file, cb) => {
    // Generating a unique file name
    const fileName = `${Math.floor(Math.random() * 1e9)}-${file.originalname}`;
    cb(null, fileName);
  },
});

// Multer upload instance
const upload = multer({ storage });

module.exports = upload;
