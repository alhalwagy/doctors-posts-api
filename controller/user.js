const User = require("./../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "mySecretKey";

exports.signUp = async (req, res) => {
  try {
    let photoUser, photoAffair;
    if (
      req.files &&
      req.files["photoUser"] &&
      req.files["photoUser"].length > 0
    ) {
      let photoUserfilename = req.files["photoUser"][0].filename;

      photoUser = `https://projectwebadvanced.onrender.com/usersImages/${photoUserfilename}`;
    }
    if (
      req.files &&
      req.files["photoAffair"] &&
      req.files["photoAffair"].length > 0
    ) {
      photoAffairFilename = req.files["photoAffair"][0].filename;
      photoAffair = `https://projectwebadvanced.onrender.com/usersImages/${photoAffairFilename}`;
    }
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      role,
      speciality,
      gender,
      workPlace,
    } = req.body;
    if (password !== confirmPassword) {
      return res.status(200).json({
        message: "كلمه المرور وتاكيد كلمه المرور غير متطابقين",
      });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role,
      speciality,
      gender,
      confirmPassword,
      workPlace,
      photoUser,
      photoAffair,
    });
    // console.log(user);

    return res.status(200).json({
      status: true,
      user,
    });
  } catch (error) {
    if (error.code == "11000") {
      if (error.keyPattern.email == 1)
        return res.status(200).json({
          status: false,
          message: "الايميل مستخدم بالفعل",
        });
      if (error.keyPattern.phoneNumber == 1)
        return res.status(200).json({
          status: false,
          message: "رقم الهاتف مستخدم بالفعل",
        });
    } else {
      return res.status(200).json({
        status: false,

        message: error.message.split(":")[2],
      });
    }
  }
};
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(200).json({
        status: false,
        message: "من فضلك اكتب البريد الالكتروني وكلمه المرور",
      });
    }
    const user = await User.findOne({ email }, { _v: 0 });
    if (!user) {
      return res.status(200).json({
        status: false,
        message: "يوجد خطا في البريد الالكتروني او كلمه المرور",
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(200).json({
        status: false,
        message: "يوجد خطا في البريد الالكتروني او كلمه المرور",
      });
    }
    id = user._id;

    const payload = {
      id,
    };
    const token = jwt.sign(payload, secretKey, {
      expiresIn: 90 * 24 * 60 * 60 * 1000,
    });

    let adminValid = user.isAdmin || false;
    let userValid = user.isValid || false;
    return res.status(200).json({
      status: true,
      token: `Bearer ${token}`,
      userValid,
      adminValid,
    });
  } catch (error) {
    console.error(error);
    return res.status(200).json({
      status: false,
      message: "يوجد خطا",
    });
  }
};
exports.updateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const user = jwt.verify(token, secretKey);
    const id = user.id;
    const {
      firstName,
      lastName,
      speciality,
      workPlace,
      email,
      role,
      phoneNumber,
    } = req.body;
    const userUpdate = await User.findById(id);
    userUpdate.email = email || userUpdate.email;
    userUpdate.role = role || userUpdate.role;
    userUpdate.phoneNumber = phoneNumber || userUpdate.phoneNumber;
    userUpdate.firstName = firstName || userUpdate.firstName;
    userUpdate.lastName = lastName || userUpdate.lastName;
    userUpdate.speciality = speciality || userUpdate.speciality;
    userUpdate.workPlace = workPlace || userUpdate.workPlace;

    let updatephoto, updateAffair;
    if (
      req.files &&
      req.files["photoUser"] &&
      req.files["photoUser"].length > 0
    ) {
      let photoUser1 = req.files["photoUser"][0].filename;

      updatephoto = `http://localhost:3000/usersImages/${photoUser1}`;
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
      data: userUpdate,
    });
  } catch (error) {
    res.status(200).json({
      status: false,
        message: error.message.split(":")[2],
    });
  }
};
