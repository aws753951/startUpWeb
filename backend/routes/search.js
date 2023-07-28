const router = require("express").Router();
const Company = require("../models/company_model");
const Post = require("../models/post_model");
const MeetPost = require("../models/meetPost_model");
const Message = require("../models/message_model");

// 這個路徑是不用登入就可以查看的
router.get("/", async (req, res) => {
  const { companyName, companyId } = req.query;

  try {
    // 搜尋公司名稱(contains)
    if (companyName) {
      let foundCompany = await Company.find({
        name: { $regex: `.*${companyName}.*`, $options: "i" },
      });
      return res.status(200).send(foundCompany);

      // 已經進入公司列表，點選某間公司進行查詢
    } else if (companyId) {
      let foundCompany = await Company.findOne({ _id: companyId }).populate([
        {
          path: "jobposts",
          // "__v" 好像是內建的，省略他
          select: "-user -updatedAt -__v",
        },
        {
          path: "meetposts",
          select: "-user -updatedAt -__v",
        },
      ]);
      return res.status(200).send(foundCompany);
      // 查詢特定文章的comments  /search/?article_id=..
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("something wrong with finding company");
  }
});

router.post("/comments", async (req, res) => {
  const { article_id, meetArticle_id } = req.body;
  try {
    if (article_id) {
      let foundArticle = await Post.findOne({ _id: article_id });
      return res.status(200).json(foundArticle.comments);
    } else if (meetArticle_id) {
      let foundMeetArticle = await MeetPost.findOne({ _id: meetArticle_id });
      return res.status(200).json(foundMeetArticle.comments);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("something wrong with finding comments");
  }
});

// 查詢特定工作文章 /search/article/?article_id=....
router.get("/article", async (req, res) => {
  try {
    const { article_id, meetArticle_id } = req.query;
    if (article_id) {
      let foundPost = await Post.findOne({ _id: article_id });
      return res.status(200).send(foundPost);
    } else if (meetArticle_id) {
      let foundMeetPost = await MeetPost.findOne({ _id: meetArticle_id });
      return res.status(200).send(foundMeetPost);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("somthing wrong with finding article");
  }
});

router.get("/newest", async (req, res) => {
  try {
    let sortingPost = await Post.find({}, { companyName: 1, oneword: 1 })
      .sort({
        createdAt: -1,
      })
      .limit(30);
    return res.status(200).send(sortingPost);
  } catch (e) {
    console.log(e);
    return res.status(500).send("somthing wrong with finding newest posts");
  }
});

router.get("/newestMeet", async (req, res) => {
  try {
    let sortingPost = await MeetPost.find({}, { companyName: 1, oneword: 1 })
      .sort({
        createdAt: -1,
      })
      .limit(30);
    return res.status(200).send(sortingPost);
  } catch (e) {
    console.log(e);
    return res.status(500).send("somthing wrong with finding newest posts");
  }
});

router.get("/hotest", async (req, res) => {
  try {
    let sortingPost = await Post.aggregate([
      {
        $project: {
          companyName: 1,
          oneword: 1,
          sumField: { $add: [{ $size: "$good" }, { $size: "$bad" }] }, // 计算 field1 和 field2 相加的结果并存为 sumField
        },
      },
      {
        $sort: {
          sumField: -1, // 按照 sumField 升序排序，-1 表示降序排序
        },
      },
    ]).limit(30);
    return res.status(200).send(sortingPost);
  } catch (e) {
    console.log(e);
    return res.status(500).send("somthing wrong with finding hotest posts");
  }
});

// 目前先不做屏蔽的功能
// router.get("/conceal", async (req, res) => {
//   try {
//     let sortingPost = await Post.aggregate([
//       {
//         $project: {
//           companyName: 1,
//           oneword: 1,
//           diffField: { $subtract: [{ $size: "$bad" }, { $size: "$good" }] }, // 计算 field1 和 field2 相加的结果并存为 sumField
//         },
//       },
//       {
//         $redact: {
//           $cond: {
//             if: { $gte: ["$diffField", 30] },
//             then: "$$KEEP",
//             else: "$$PRUNE",
//           },
//         },
//       },
//       {
//         $sort: {
//           diffField: -1, // 按照 diffField 升序排序，-1 表示降序排序
//         },
//       },
//     ]).limit(30);
//     res.status(200).send(sortingPost);
//   } catch (e) {
//     console.log(e);
//     res.status(500).send("somthing wrong with finding hotest posts");
//   }
// });

// 從眾多的message中挑選conversationId是公開聊天室的id
router.get("/allmessage", async (req, res) => {
  let allMessage = await Message.find(
    {
      conversationId: "64c2a80c697e2d0c10a34e61",
    },
    { message: 1, createdAt: 1, _id: 0 }
  ).populate({
    path: "user_id",
    // "__v" 好像是內建的，省略他
    select: "username",
  });
  return res.status(200).send(allMessage);
});

// 由前面吐最新的資料
router.get("/sortmessage", async (req, res) => {
  let allMessage = await Message.find(
    {
      conversationId: "64c2a80c697e2d0c10a34e61",
    },
    { message: 1, createdAt: 1, _id: 0 }
  )
    .populate({
      path: "user_id",
      // "__v" 好像是內建的，省略他
      select: "username",
    })
    .sort({ createdAt: -1 });
  return res.status(200).send(allMessage);
});

module.exports = router;
