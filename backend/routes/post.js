const router = require("express").Router();
const Post = require("../models/post_model");
const Company = require("../models/company_model");
const User = require("../models/user_model");

router.get("/", (req, res) => {
  let { email, user_id } = req.user;
  res.send({ email, user_id });
});

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

router.post("/:company_id/article", async (req, res) => {
  try {
    // 必定放joi
    const { company_id } = req.params;
    let foundCompany = await Company.findOne({ _id: company_id });
    if (!foundCompany) {
      res.status(403).send("company not found");
    }
    const { email } = req.user;
    let foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(403).send("email not found");
    }

    const { id, username } = foundUser;
    let object = { ...req.body, user: id, username, company: company_id };

    const newPost = new Post(object);
    let savedPost = await newPost.save();

    await Company.findOneAndUpdate(
      { _id: company_id },
      { $push: { jobposts: savedPost._id } }
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
  const { article_id, message } = req.body;
  const foundUser = await User.findOne({ _id: user_id });
  const username = foundUser.username;
  try {
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
    res.status(200).send({ user_id, username, message, date: date.toString() });
  } catch (e) {
    console.log(e);
    res.status(403).send("message not saved");
  }
});

// 針對特定文章進行同意或不同意
router.post("/article/agree", async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { article_id } = req.body;
    const AgreePost = await Post.findOne({ _id: article_id, good: user_id });
    const DisAgreePost = await Post.findOne({ _id: article_id, bad: user_id });
    console.log(user_id, article_id);
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
  } catch (e) {
    console.log(e);
    res.status(500).send("something wrong with sending agree");
  }
});

// 針對特定文章進行同意或不同意
router.post("/article/disagree", async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { article_id } = req.body;
    const AgreePost = await Post.findOne({ _id: article_id, good: user_id });
    const DisAgreePost = await Post.findOne({ _id: article_id, bad: user_id });

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
  } catch (e) {
    console.log(e);
    res.status(500).send("something wrong with sending disagree");
  }
});

module.exports = router;
