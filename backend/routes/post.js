const router = require("express").Router();
const Post = require("../models/post_model");
const Company = require("../models/company_model");
const User = require("../models/user_model");

router.get("/", (req, res) => {
  let email = req.user.email;
  res.send(email);
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

    const { id } = foundUser;
    let object = { ...req.body, user: id, company: company_id };

    const newPost = new Post(object);
    await newPost.save();
    res.status(200).send("article successfully saved");
  } catch (e) {
    console.log(e);
    res.status(403).send("article not saved");
  }
});

module.exports = router;
