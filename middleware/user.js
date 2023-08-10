const jwt = require("jsonwebtoken");
const secretKey = "mySecretKey";
const User = require("./../model/user.js");

exports.authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const user = jwt.verify(token, secretKey);
    id = user.id;
    const userFind = await User.findById(id);
    valid = userFind.isValid;
    Admain = userFind.isAdmin;
    if (!valid) {
      return res.status(200).json({
        status:false,
        message: "من فضلك انتظر موافقه الادمن",
      });
    }

    next();
  } catch (e) {
    res.status(200).json({
              status:false,
      message: "Auth failed",
    });
  }
};
