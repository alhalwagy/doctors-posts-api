const mongoose = require("mongoose");
const commentNormal = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "must have comment"],
  },
    time: { type: String },
  date: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postnormId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Normal",
  },
});
module.exports = mongoose.model("CommentNorm", commentNormal);
