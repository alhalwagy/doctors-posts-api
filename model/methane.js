const mongoose = require("mongoose");

const methane = new mongoose.Schema({
  // Name:{type:String},
  accidentEffect: { type: String,    required: [true, "مدي اثر الحادث مطلوب"] },
  locationCorrectly: { type: String,    required:[true, "اتحديد مكان الحادث بدقه مطلوب"]},
  accidentKind: { type: String,    required: [true, "نوع الحادث مطلوب"] },
  dengerousKind: { type: String,    required: [true, "انواع الخطر المحتمله مطلوب"] },
  whatWAyArrive: { type: String,    required: [true, "طريقه الوصول للموقع مطلوب"]},
  numberofvictims: { type: String,    required: [true, "عدد الضحايا مطلوب"] },
  emergencyServices: { type: String,    required: [true, "خدمات الطوارئ مطلوبه"] },
    time: { type: String },
  date: { type: String },
  userData: {
    type: mongoose.Schema.Types.Object,
  },
});
module.exports = mongoose.model("methane", methane);
