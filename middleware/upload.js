const path = require("path");
const multer = require("multer");

const photoUser = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("uploads/usersImages/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const photoAffair = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("uploads/photoAffair/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: photoUser,
  fileFilter: function (req, file, cb) {
    if (file.fieldname === "photoUser") {
      cb(null, { storage: photoUser });
    } else if (file.fieldname === "photoAffair") {
      cb(null, { storage: photoAffair });
    } else {
      cb(null, false);
    }
  },
}).fields([
  { name: "photoUser", maxCount: 1 },
  { name: "photoAffair", maxCount: 1 },
]);
module.exports = upload;
