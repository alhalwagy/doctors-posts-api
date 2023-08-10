const jwt = require("jsonwebtoken");
const secretKey = "mySecretKey";
const User = require("./../model/user");

async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const user = jwt.verify(token, secretKey);
    id = user.id;
    const userFind = await User.findById(id);
    valid = userFind.isValid;
    admin = userFind.isAdmin;
    if (!valid && !admin) {
      return res.status(401).json({
        message: "Access Denied",
      });
    }

    next();
  } catch (e) {
    res.status(500).json({
      message: "Auth failed",
    });
  }
}

module.exports = authenticateToken;
