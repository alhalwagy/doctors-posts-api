const express = require("express");
const normalPost = require("./../controller/normalPost");
const gardUser = require("./../middleware/user");


const app = express();
const upload = require("../middleware/normalUpload");
module.exports = app
  .post("/normalPost", upload,gardUser.authenticateToken, normalPost.postNorm)
  .get("/getPostsNormal", normalPost.getNormalPosts);
