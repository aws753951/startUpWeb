const router = require("express").Router();
const Post = require("../models/post_model");
const MeetPost = require("../models/meetPost_model");
const Company = require("../models/company_model");
const User = require("../models/user_model");

router.get("/", (req, res) => {
  let { email, user_id } = req.user;
  res.send({ email, user_id });
});

// 創建新的公司資訊
router.post("/company", async (req, res) => {
  try {
    const { name, url } = req.body;
    let foundCompany = await Company.findOne({ name });
    if (foundCompany) {
      res.status(403).send("company exists");
    }
    let newCompany = new Company({ name, url });
    await newCompany.save();
    res.status(200).send("company successfully saved");
  } catch (e) {
    console.log(e);
    res.status(403).send("company not saved");
  }
});

router.post("/article/post", async (req, res) => {
  try {
    // 必定放joi
    let foundCompany = await Company.findOne({ _id: req.body.companyId });
    if (!foundCompany) {
      res.status(403).send("company not found");
    }
    const { email } = req.user;
    let foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(403).send("user not found");
    }
    const { id, username } = foundUser;
    let object = {
      ...req.body,
      user: id,
      username,
      companyName: foundCompany.name,
    };

    const newPost = new Post(object);
    let savedPost = await newPost.save();

    await Company.findOneAndUpdate(
      { _id: req.body.companyId },
      {
        $push: {
          jobposts: { $each: [savedPost._id], $position: 0 },
          wageandseniority: {
            article_id: savedPost._id,
            data: {
              yearwage: req.body.yearwage,
              seniority: req.body.seniority,
            },
          },
          evaluation: {
            article_id: savedPost._id,
            data: {
              loading: req.body.loading,
              environ: req.body.environ,
              satisfaction: req.body.satisfaction,
              easy: req.body.easy,
              addworkhour: req.body.addworkhour,
            },
          },
        },
      }
    );

    res.status(200).send("article successfully saved");
  } catch (e) {
    console.log(e);
    res.status(403).send("article not saved");
  }
});

router.post("/meetArticle/post", async (req, res) => {
  try {
    // 必定放joi
    let foundCompany = await Company.findOne({ _id: req.body.companyId });
    if (!foundCompany) {
      res.status(403).send("company not found");
    }
    const { email } = req.user;
    let foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(403).send("user not found");
    }
    // 待刪除.......................................................
    console.log(req.body);
    const { id, username } = foundUser;
    let object = {
      ...req.body,
      user: id,
      username,
      companyName: foundCompany.name,
    };

    const newMeetPost = new MeetPost(object);
    let savedMeetPost = await newMeetPost.save();

    await Company.findOneAndUpdate(
      { _id: req.body.companyId },
      {
        $push: {
          meetposts: { $each: [savedMeetPost._id], $position: 0 },
        },
      }
    );

    res.status(200).send("article successfully saved");
  } catch (e) {
    console.log(e);
    res.status(403).send("article not saved");
  }
});

// 針對特定文章進行留言
router.post("/article", async (req, res) => {
  const user_id = req.user.user_id;
  const date = Date.now();
  const { article_id, meetArticle_id, message } = req.body;
  try {
    const foundUser = await User.findOne({ _id: user_id });
    const username = foundUser.username;

    if (article_id) {
      let result = await Post.findByIdAndUpdate(
        { _id: article_id },
        {
          $push: {
            comments: { user_id, username, message, date: date.toString() },
          },
        },

        // 得寫在push的後面
        { new: true }
      );
      if (!result) {
        res.status(403).send("cant find or update article");
      }
      res
        .status(200)
        .send({ user_id, username, message, date: date.toString() });
    } else if (meetArticle_id) {
      let result = await MeetPost.findByIdAndUpdate(
        { _id: meetArticle_id },
        {
          $push: {
            comments: { user_id, username, message, date: date.toString() },
          },
        },
        { new: true }
      );
      if (!result) {
        res.status(403).send("cant find or update article");
      }
      res
        .status(200)
        .send({ user_id, username, message, date: date.toString() });
    }
  } catch (e) {
    console.log(e);
    res.status(403).send("message not saved");
  }
});

// 針對特定文章進行同意或不同意
router.post("/article/agree", async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { article_id, meetArticle_id } = req.body;
    if (article_id) {
      const AgreePost = await Post.findOne({ _id: article_id, good: user_id });
      const DisAgreePost = await Post.findOne({
        _id: article_id,
        bad: user_id,
      });
      if (AgreePost && !DisAgreePost) {
        await Post.findOneAndUpdate(
          { _id: article_id },
          { $pull: { good: user_id } }
        );
      } else if (!AgreePost && DisAgreePost) {
        await Post.findOneAndUpdate(
          { _id: article_id },
          { $pull: { bad: user_id }, $push: { good: user_id } }
        );
      } else if (!AgreePost && !DisAgreePost) {
        await Post.findOneAndUpdate(
          { _id: article_id },
          { $push: { good: user_id } }
        );
      }

      res.status(200).send("handle agree successfully");
    } else if (meetArticle_id) {
      const AgreeMeetPost = await MeetPost.findOne({
        _id: meetArticle_id,
        good: user_id,
      });
      const DisAgreeMeetPost = await MeetPost.findOne({
        _id: meetArticle_id,
        bad: user_id,
      });
      if (AgreeMeetPost && !DisAgreeMeetPost) {
        await MeetPost.findOneAndUpdate(
          { _id: meetArticle_id },
          { $pull: { good: user_id } }
        );
      } else if (!AgreeMeetPost && DisAgreeMeetPost) {
        await MeetPost.findOneAndUpdate(
          { _id: meetArticle_id },
          { $pull: { bad: user_id }, $push: { good: user_id } }
        );
      } else if (!AgreeMeetPost && !DisAgreeMeetPost) {
        await MeetPost.findOneAndUpdate(
          { _id: meetArticle_id },
          { $push: { good: user_id } }
        );
      }

      res.status(200).send("handle agree successfully");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("something wrong with sending agree");
  }
});

// 針對特定文章進行同意或不同意
router.post("/article/disagree", async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { article_id, meetArticle_id } = req.body;
    if (article_id) {
      const AgreePost = await Post.findOne({ _id: article_id, good: user_id });
      const DisAgreePost = await Post.findOne({
        _id: article_id,
        bad: user_id,
      });

      if (AgreePost && !DisAgreePost) {
        await Post.findOneAndUpdate(
          { _id: article_id },
          { $pull: { good: user_id }, $push: { bad: user_id } }
        );
      } else if (!AgreePost && DisAgreePost) {
        await Post.findOneAndUpdate(
          { _id: article_id },
          { $pull: { bad: user_id } }
        );
      } else if (!AgreePost && !DisAgreePost) {
        await Post.findOneAndUpdate(
          { _id: article_id },
          { $push: { bad: user_id } }
        );
      }

      res.status(200).send("handle disagree successfully");
    } else if (meetArticle_id) {
      const AgreeMeetPost = await MeetPost.findOne({
        _id: meetArticle_id,
        good: user_id,
      });
      const DisAgreeMeetPost = await MeetPost.findOne({
        _id: meetArticle_id,
        bad: user_id,
      });

      if (AgreeMeetPost && !DisAgreeMeetPost) {
        await MeetPost.findOneAndUpdate(
          { _id: meetArticle_id },
          { $pull: { good: user_id }, $push: { bad: user_id } }
        );
      } else if (!AgreeMeetPost && DisAgreeMeetPost) {
        await MeetPost.findOneAndUpdate(
          { _id: meetArticle_id },
          { $pull: { bad: user_id } }
        );
      } else if (!AgreeMeetPost && !DisAgreeMeetPost) {
        await MeetPost.findOneAndUpdate(
          { _id: meetArticle_id },
          { $push: { bad: user_id } }
        );
      }

      res.status(200).send("handle disagree successfully");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("something wrong with sending disagree");
  }
});

module.exports = router;
