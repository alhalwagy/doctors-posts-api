const jwt = require("jsonwebtoken");
const { findById } = require("../model/user");
const User = require("./../model/user.js");
const secretKey = "mySecretKey";
exports.authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const user = jwt.verify(token, secretKey);
    console.log(user);
    id = user.id;
    const userFind = await User.findById(id);
    console.log(userFind);
    res.status(200).json({
      data: userFind,
    });
  } catch (e) {
    res.status(200).json({
      message: e,
    });
  }
};
