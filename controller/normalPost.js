const Normal = require("./../model/normal");
const APIFeatures = require("./../utils/apiFeature");
const jwt = require("jsonwebtoken");
const secretKey = "mySecretKey";
const User = require("./../model/user");

exports.postNorm = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const user = jwt.verify(token, secretKey);
    let id = user.id;
    const userFind = await User.findById(id);
    const userData = userFind;
    
    let photo, file;
    if (req.files && req.files["file"] && req.files["file"].length > 0) {
      let filefilename = req.files["file"][0].filename;

      file = `https://projectwebadvanced.onrender.com/normalUpload/${filefilename}`;
    }
    if (req.files && req.files["photo"] && req.files["photo"].length > 0) {
      photoFilename = req.files["photo"][0].filename;
      photo = `https://projectwebadvanced.onrender.com/normalUpload/${photoFilename}`;
    }
    const { textArea, link,date,time } = req.body;

    const newNormal = await Normal.create({
      textArea,
      link,
      userData,
      photo,
      file,
      time,
      date
    });

    res.status(200).json({
      status: true,
      data: {
        newNormal,
      },
    });
  } catch (error) {
    res.status(200).json({
      status: false,
        message: error.message.split(":")[2],
    });
  }
};

exports.getNormalPosts = async (req, res, next) => {
  try {

      const features = new APIFeatures(Normal.find(), req.query)
      .paginate()
      .filter()
      .limitFields()
      .sort();

    const normalsPosts = await features.query;
    res.status(200).json({
      status: true,
      result: normalsPosts.length,
      data: {
        normalsPosts,
      },
    });
  } catch (e) {
    res.status(200).json({
      status: false,
      message: e.message,
    });
  }
};
