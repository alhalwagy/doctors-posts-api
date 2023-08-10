const express = require("express");
const methane = require("../controller/methane");
const app = express();
const gardUser = require("./../middleware/user");
module.exports = app
  .post("/addPost", gardUser.authenticateToken, methane.methanePost)
  .get("/getMethane", methane.getMethaneUser);
