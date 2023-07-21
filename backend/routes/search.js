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
    } else if (article_id) {
      let foundArticle = await Post.findOne({ _id: article_id });
      res.status(200).json(foundArticle.comments);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("something wrong with finding company");
  }
});

module.exports = router;
