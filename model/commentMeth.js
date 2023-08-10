const mongoose = require("mongoose");
const commentMeth = new mongoose.Schema({
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
  postmethId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "methane",
  },
});
module.exports = mongoose.model("CommentMeth", commentMeth);
