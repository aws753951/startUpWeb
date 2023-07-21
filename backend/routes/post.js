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
    await newPost.save();
    res.status(200).send("article successfully saved");
  } catch (e) {
    console.log(e);
    res.status(403).send("article not saved");
  }
});

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
    res.status(200).send("message successfully saved");
  } catch (e) {
    console.log(e);
    res.status(403).send("message not saved");
  }
});

module.exports = router;
