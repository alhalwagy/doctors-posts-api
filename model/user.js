const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "الاسم الاول مطلوب"],
    minlength: 2,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: [true, "الاسم الاخير مطلوب"],
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "البريد الالكتروني مطلوب"],
    unique: true,
        validate: {
      validator: function (v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          v
        );
      },
      message: (props) =>
        ` اكتب الايميل بطريقه صحيحه`,
    },
  },
  password: {
    type: String,
    required: [true, "كلمه المرور مطلوبه"],
    validate: {
      validator: function (v) {
        return /^(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/.test(
          v
        );
      },
      message: (props) =>
        `يجب ان تتكون كلمه المرور من 8 احرف و حرف كابتل علي الاقل`,
    },
  },
  phoneNumber: {
    type: String,
    required: [true, "رقم الهاتف مطلوب"],
    unique: [true, "رقم الهاتف "],
    validate: {
      validator: function (v) {
        return v !== null && v !== undefined && /^\d{10}$/.test(v);
      },
      message: (props) => `اكتب رقم الهاتف بطريقه صحيحه`,
    },
  },
  role: {
    type: String,
    enum: ["طبيب", "اداري"],
    required: [true, "الوظيفه مطلوب"],
  },
  speciality: {
    type: String,
    required: [true, "التخصص مطلوب"],
    minlength: 2,
    maxlength: 50,
  },
  workPlace: {
    type: String,
    required: [true, "مكان العمل مطلوب"],
    minlength: 2,
    maxlength: 50,
  },
  gender: {
    type: String,
    enum: ["ذكر", "انثي"],
    required: [true, "النوع مطلوب"],
  },
  photoUser: { type: String, required: [true, "الصوره الشخصيه مطلوبه"] },
  photoAffair: {
    type: String,
    required: [true, "ورفه الشئون الاداريه مطلوبه"],
  },
  isAdmin: { type: Boolean },
  isValid: { type: Boolean },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);
