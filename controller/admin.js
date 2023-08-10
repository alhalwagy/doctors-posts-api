const User = require("./../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "mySecretKey";
const APIFeatures = require("./../utils/apiFeature");

exports.getUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne(
      {
        email,
      },
      { __v: 0, _id: 1 }
    );
    if (!user) {
      return res.status(200).json({
          status: false,
        
        message: "NOT FOUND USER",
      });
    }
    res.status(200).json({
      status: true,
     data: user,
    });
  } catch (error) {
    res.status(200).json({
      status: false,
      message: "Internal server error",
    });
  }
};
exports.getAllUser = async (req, res, next) => {
  try {
    const feature = new APIFeatures(User.find(), req.query)
      .paginate()
      .filter()
      .sort()
      .limitFields();
    const users = await feature.query;
    res.status(200).json({
      status: true,
          result: users.length,
     data: users,
    });
  } catch (e) {
    res.status(200).json({
        status: false,
      message: e.message,
    });
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.deleteOne({
      email,
    });
    if (!user) {
      return res.status(200).json({
          status: false,
        message: "NOT FOUND USER",
      });
    }
    res.status(200).json({
      status: true,
      deletedCount: user.deletedCount,
    });
  } catch (e) {
    res.status(200).json({
        status: false,
      message: e.message,
    });
  }
};
exports.updateUser = async (req, res, next) => {
  try {
    const {
      email,
      firstName,
      lastName,
      newEmail,
      newPassword,
      confirmPassword,
      phoneNumber,
      role,
      speciality,
      gender,
      workPlace,
    } = req.body;
    const userUpdate = await User.findOne({ email });
    if (!userUpdate) {
      return res.status(200).json({
              status: false,

        message: "USER NOT FOUND",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(401).json({
        message: "Password and confirmPassword do not match",
      });
    }
    userUpdate.password = newPassword || userUpdate.password;

    userUpdate.firstName = firstName || userUpdate.firstName;
    userUpdate.lastName = lastName || userUpdate.lastName;
    userUpdate.phoneNumber = phoneNumber || userUpdate.phoneNumber;
    userUpdate.email = newEmail || userUpdate.email;

    userUpdate.workPlace = workPlace || userUpdate.workPlace;
    userUpdate.gender = gender || userUpdate.gender;
    userUpdate.speciality = speciality || userUpdate.speciality;
    userUpdate.role = role || userUpdate.role;

    let updatephoto, updateAffair;
    if (
      req.files &&
      req.files["photoUser"] &&
      req.files["photoUser"].length > 0
    ) {
      let photoUser1 = req.files["photoUser"][0].filename;

      updatephoto = `http://localhost:3000/usersImages/${photoUser1}`;
      console.log(updatephoto);
    }
    if (
      req.files &&
      req.files["photoAffair"] &&
      req.files["photoAffair"].length > 0
    ) {
      let photoAffair2 = req.files["photoAffair"][0].filename;
      updateAffair = `http://localhost:3000/usersImages/${photoAffair2}`;
    }
    userUpdate.photoUser = updatephoto || userUpdate.photoUser;
    userUpdate.photoAffair = updateAffair || userUpdate.photoAffair;
    await userUpdate.save();

    res.status(200).json({
      status: true,
      data:userUpdate,
    });
  } catch (e) {
    console.error(e);

    res.status(200).json({
      status: false,
      message: e.message,
    });
  }
};

exports.makeAdmain = async (req, res, next) => {
  try {
    const email = req.body.email;

    const user = await User.findOne(
      {
        email: email,
      },
      { __v: 0, _id: 1 }
    );
    if (!user) {
      return res.status(200).json({
        message: "User not found",
      });
    }
    user.isAdmin = true;
    user.isValid = true;
    await user.save();
    res.status(200).json({
       status: true,
      message: "this user now is an admin",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      status: false,
      message: "Internal server error",
    });
  }
};
exports.outOfAdmin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne(
      {
        email: email,
      },
      { __v: 0, _id: 1 }
    );
    if (!user) {
      return res.status(200).json({
         status: false,
        message: "User not found",
      });
    }
    user.isAdmin = false;
    user.isValid = false;
    await user.save();
    res.status(200).json({
      status: true,
      message: "this user now is not  admin",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      status: false,
      message: "Internal server error",
    });
  }
};
exports.makeValid = async (req, res, next) => {
  try {
    const email = req.body.email;

    const user = await User.findOne(
      {
        email: email,
      },
      { __v: 0, _id: 1 }
    );
    if (!user) {
      return res.status(200).json({
              status: false,

        message: "User not found",
      });
    }
    user.isValid = true;
    user.isAdmin = false;
    await user.save();
    res.status(200).json({
            status: true,

      message: "هذا المستخدم صالح",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
            status: false,

      message: "Internal server error",
    });
  }
};
exports.outOfValid = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne(
      {
        email: email,
      },
      { __v: 0, _id: 1 }
    );
    if (!user) {
      return res.status(200).json({
              status: false,

        message: "User not found",
      });
    }
    user.isValid = false;
    user.isAdmin = false;
    await user.save();
    res.status(200).json({
            status: true,

      message: "هذا المستخدم غير صالح",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
            status: false,

      message: "Internal server error",
    });
  }
};
