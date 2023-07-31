const router = require("express").Router();
const Post = require("../models/post_model");
const MeetPost = require("../models/meetPost_model");
const Company = require("../models/company_model");
const User = require("../models/user_model");
const mongoose = require("mongoose");

// 刪除工作文章
router.delete("/article/:_id", async (req, res) => {
  // 提供密碼
  const { password } = req.body;
  if (password !== process.env.DELETE_PASSWORD) {
    return res.status(403).send("密碼錯誤");
  }

  // 確認jwt是我本人登入的
  const { email } = req.user;
  if (email !== process.env.DELETE_ADMIN) {
    return res.status(403).send("JWT錯誤");
  }

  // Transaction
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // 要刪除po文的id
    const { _id } = req.params;

    let foundPost = await Post.findOne({ _id });
    if (!foundPost) {
      return res.status(403).send("沒有該貼文");
    }

    let deletePostResult = await Post.deleteOne({ _id }, { session }).exec();
    if (deletePostResult.deletedCount !== 1) {
      throw new Error("Document not found or failed to delete.");
    }
    // 從company刪除 (這個transaction是假的，沒有效果，之後再來想怎麼處理)
    await Company.findOneAndUpdate(
      { _id: foundPost.companyId },
      {
        $pull: {
          jobposts: _id,
          wageandseniority: { article_id: _id },
          evaluation: { article_id: _id },
        },
      },
      { new: true },
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    res.status(200).send("刪除工作文章OK");
  } catch (e) {
    console.log(e);
    res.status(500).send("刪除工作文章有問題");
  }
});

// 刪除工作文章
router.delete("/meetArticle/:_id", async (req, res) => {
  // 提供密碼
  const { password } = req.body;
  if (password !== process.env.DELETE_PASSWORD) {
    return res.status(403).send("密碼錯誤");
  }

  // 確認jwt是我本人登入的
  const { email } = req.user;
  if (email !== process.env.DELETE_ADMIN) {
    return res.status(403).send("JWT錯誤");
  }

  // Transaction
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // 要刪除po文的id
    const { _id } = req.params;

    let foundMeetPost = await MeetPost.findOne({ _id });
    if (!foundMeetPost) {
      return res.status(403).send("沒有該貼文");
    }

    let deleteMeetPostResult = await MeetPost.deleteOne(
      { _id },
      { session }
    ).exec();
    if (deleteMeetPostResult.deletedCount !== 1) {
      throw new Error("Document not found or failed to delete.");
    }
    // 從company刪除 (這個transaction是假的，沒有效果，之後再來想怎麼處理)
    await Company.findOneAndUpdate(
      { _id: foundMeetPost.companyId },
      {
        $pull: {
          meetposts: _id,
        },
      },
      { new: true },
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    res.status(200).send("刪除面試文章OK");
  } catch (e) {
    console.log(e);
    res.status(500).send("刪除面試文章有問題");
  }
});

module.exports = router;
