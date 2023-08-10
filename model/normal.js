const mongoose = require("mongoose");

const normal = new mongoose.Schema({
  textArea: { type: String,     required: [true, "اضف منشور مطلوب"] },
  link: { type: String },
  file: { type: String },
  photo: { type: String },
  time: { type: String },
  date: { type: String },
  userData: {
    type: mongoose.Schema.Types.Object,
  },
  
});
module.exports = mongoose.model("Normal", normal);
