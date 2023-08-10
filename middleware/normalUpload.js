const path = require("path");
const multer = require("multer");

const photo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("uploads/normalUpload/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const file = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("uploads/photoAffair/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: photo,
  fileFilter: function (req, file, cb) {
    if (file.fieldname === "photo") {
      cb(null, { storage: photo });
    } else if (file.fieldname === "file") {
      cb(null, { storage: file });
    } else {
      cb(null, false);
    }
  },
}).fields([
  { name: "photo", maxCount: 1 },
  { name: "file", maxCount: 1 },
]);
module.exports = upload;
