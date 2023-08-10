const express = require("express");
const comments = require("./../controller/comments");
const gardUser = require("./../middleware/user");

const app = express();
module.exports = app
  .post(
    "/addCommentNorm/:id",
    gardUser.authenticateToken,
    comments.addCommentNorm
  )
  .post(
    "/addCommentMeth/:id",
    gardUser.authenticateToken,
    comments.addCommentMeth
  )
  .get(
    "/getCommentNorm/:id",
    comments.getNormcomments
  )
  .get(
    "/getCommentMeth/:id",
    comments.getMethcomments
  );
