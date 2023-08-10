const Methane = require("./../model/methane");
const jwt = require("jsonwebtoken");
const secretKey ="mySecretKey";
const apiFeature = require("./../utils/apiFeature");
const APIFeatures = require("./../utils/apiFeature");
const User = require("./../model/user");

exports.methanePost = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const user = jwt.verify(token, secretKey);
    let id = user.id;
    const userFind = await User.findById(id);
    const userData = userFind;
    const {
      accidentEffect,
      locationCorrectly,
      accidentKind,
      dengerousKind,
      whatWAyArrive,
      numberofvictims,
      emergencyServices,
        time,
       date,
    } = req.body;
    const methane = await Methane.create({
      accidentEffect,
      locationCorrectly,
      accidentKind,
      dengerousKind,
      whatWAyArrive,
      numberofvictims,
      emergencyServices,
      time,
      date,
      userData,
    });

    return res.status(200).json({
      status: true,
      data:methane,
    });
  } catch (error) {
    res.status(200).json({
      stauts: false,
        message: error.message.split(":")[2],
    });
  }
};

exports.getMethaneUser = async (req, res, next) => {
  try {
    const features = new APIFeatures(Methane.find(), req.query)
      .paginate()
      .filter()
      .limitFields()
      .sort();

    const methanes = await features.query;
    res.status(200).json({
      status: true,
      result: methanes.length,
      data: {
        methanes,
      },
    });
  } catch (e) {
    res.status(200).json({
      stauts: false,
      message: e.message,
    });
  }
};
