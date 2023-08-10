const express = require("express");
const admin = require("../controller/admin");
const upload = require("../middleware/upload.js");
const gardAdmin = require("./../middleware/admin");

const app = express();
module.exports = app
  .get("/getUser", gardAdmin, admin.getUser)
  .get("/getAllUser", gardAdmin, admin.getAllUser)
  .delete("/deleteUser", gardAdmin, admin.deleteUser)
  .put("/updateUser", upload, gardAdmin, admin.updateUser)
  .post("/makeAdmain", gardAdmin, admin.makeAdmain)
  .post("/outOfAdmin", gardAdmin, admin.outOfAdmin)
  .post("/makeValid", gardAdmin, admin.makeValid)
  .post("/outOfValid", gardAdmin, admin.outOfValid);
