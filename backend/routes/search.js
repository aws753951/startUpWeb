const router = require("express").Router();
const Company = require("../models/company_model");
const Post = require("../models/post_model");

router.get("/", async (req, res) => {
  const { companyName, companyId } = req.query;

  try {
    if (companyName) {
      let foundCompany = await Company.find({
        name: { $regex: `.*${companyName}.*`, $options: "i" },
      });
      res.status(200).send(foundCompany);
    } else if (companyId) {
      let foundCompany = await Company.findOne({ _id: companyId }).populate({
        path: "jobposts",
        // "__v" 好像是內建的，省略他
        select: "-_id -user -updatedAt -__v",
      });

      res.status(200).send(foundCompany);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("something wrong with finding company");
  }
});

module.exports = router;
