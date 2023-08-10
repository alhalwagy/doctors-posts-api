const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
var cors = require("cors");
const port = process.env.PORT;
const hostname = process.env.hostname;
const mongoose = require("mongoose");
const userRouter = require("./router/user");
const adminRouter = require("./router/admin");
const methaneRouter = require("./router/methane");
const normalRouter = require("./router/normal");
const commentsRoute = require("./router/commentsRoute");

const session = require("express-session");
app.use(express.json());
app.use("/usersImages", express.static("uploads/usersImages"));
app.use("/normalUpload", express.static("uploads/normalUpload"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors());
(async () => {
  try {
    await mongoose.connect("mongodb+srv://abdelalmahmoud25:Kign6xptJAPRpVjv@cluster0.iy5nf2y.mongodb.net/?retryWrites=true&w=majority");
    console.log("Db connect");
    console.log("connected");
  } catch (e) {
    console.log(e);
  }
  try {
    app.use("/user", userRouter);
    app.use("/admin", adminRouter);
    app.use("/methane", methaneRouter);
    app.use("/normal", normalRouter);
    app.use("/comment", commentsRoute).listen(port, hostname, () => {
      console.log(`http://${hostname}:${port}`);
    });
  } catch (eror) {
    res.status(200).json({
      error: "Internal server error",
    });
  }
})();
