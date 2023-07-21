const router = require("express").Router();
const Company = require("../models/company_model");

router.get("/", async (req, res) => {
  const { companyName } = req.query;

  try {
    let foundCompany = await Company.find({
      name: { $regex: `.*${companyName}.*`, $options: "i" },
    });
    res.status(200).send(foundCompany);
  } catch (e) {
    console.log(e);
    res.status(500).send("something wrong with finding company");
  }
});

module.exports = router;
