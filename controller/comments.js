const CommentNorm = require("./../model/commentsNorm");
const CommentMeth = require("./../model/commentMeth");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { postNorm } = require("./normalPost");
const secretKey = "mySecretKey";

exports.addCommentNorm = async (req, res, next) => {
  try {
    postnormId = req.params.id;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const user = jwt.verify(token, secretKey);
    const userId = user.id;
    const { comment } = req.body;

    const newComment = await CommentNorm.create({
      comment,
      userId,
      postnormId,
    });
    res.status(200).json({
      status: true,
      data: {
        newComment,
      },
    });
  } catch (e) {
    res.status(200).json({
      status: false,
      message: e.message,
    });
  }
};

exports.addCommentMeth = async (req, res, next) => {
  try {
    postmethId = req.params.id;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const user = jwt.verify(token, secretKey);
    const userId = user.id;
    const { comment } = req.body;
    const newComment = await CommentMeth.create({
      comment,
      userId,
      postmethId,
    });
    res.status(200).json({
       status: true,
      data: {
        newComment,
      },
    });
  } catch (e) {
    res.status(200).json({
      status: false,
      message: e.message,
    });
  }
};

exports.getNormcomments = async (req, res, next) => {
  try {
    commentsNorm = req.params.id;
    const comments = await CommentNorm.find({
      postnormId: commentsNorm,
    })
      .populate({
        path: "userId",
        select: "firstName lastName speciality role workplace",
      })
      .populate({
        path: "postnormId",
      });
    res.status(200).json({
      status: true,
      result: comments.length,
      data: {
        comments,
      },
    });
  } catch (e) {
    res.status(200).json({
      status: false,
      message: e.message,
    });
  }
};

exports.getMethcomments = async (req, res, next) => {
  try {
    commentMeth = req.params.id;
    const comments = await CommentMeth.find({
      postmethId: commentMeth,
    })
      .populate({
        path: "userId",
        select: "firstName lastName speciality role workplace",
      })
      .populate({
        path: "postmethId",
      });
    res.status(200).json({
      status:true,
      result: comments.length,
      data: {
        comments,
      },
    });
  } catch (e) {
    res.status(200).json({
      status: false,
      message: e.message,
    });
  }
};
