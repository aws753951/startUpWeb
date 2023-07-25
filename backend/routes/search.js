const router = require("express").Router();
const Company = require("../models/company_model");
const Post = require("../models/post_model");

// 這個路徑是不用登入就可以查看的
router.get("/", async (req, res) => {
  const { companyName, companyId, article_id } = req.query;

  try {
    // 搜尋公司名稱(contains)
    if (companyName) {
      let foundCompany = await Company.find({
        name: { $regex: `.*${companyName}.*`, $options: "i" },
      });
      res.status(200).send(foundCompany);

      // 已經進入公司列表，點選某間公司進行查詢
    } else if (companyId) {
      let foundCompany = await Company.findOne({ _id: companyId }).populate({
        path: "jobposts",
        // "__v" 好像是內建的，省略他
        select: "-user -updatedAt -__v",
      });
      res.status(200).send(foundCompany);
      // 查詢特定文章的comments  /search/?article_id=..
    } else if (article_id) {
      let foundArticle = await Post.findOne({ _id: article_id });
      res.status(200).json(foundArticle.comments);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("something wrong with finding company");
  }
});

// 查詢特定文章 /search/article/?article_id=....
router.get("/article", async (req, res) => {
  try {
    const { article_id } = req.query;
    let foundPost = await Post.findOne({ _id: article_id });
    res.status(200).send(foundPost);
  } catch (e) {
    console.log(e);
    res.status(500).send("somthing wrong with finding article");
  }
});

router.get("/newest", async (req, res) => {
  try {
    let sortingPost = await Post.find({}, { companyName: 1, oneword: 1 })
      .sort({
        createdAt: -1,
      })
      .limit(30);
    res.status(200).send(sortingPost);
  } catch (e) {
    console.log(e);
    res.status(500).send("somthing wrong with finding newest posts");
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
    res.status(200).send(sortingPost);
  } catch (e) {
    console.log(e);
    res.status(500).send("somthing wrong with finding hotest posts");
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

module.exports = router;
