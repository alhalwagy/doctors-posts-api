const express = require("express");
const user = require("../controller/user");
const app = express();
const upload = require("../middleware/upload.js");
const gardUser = require("./../middleware/user");
const getUser = require("./../middleware/getUser");
module.exports = app
  .post("/signUp", upload, user.signUp)
  .post("/signIn", user.signin)
  .put("/updateUser/", upload, gardUser.authenticateToken, user.updateUser)
  .post("/getUser", getUser.authenticateToken);
