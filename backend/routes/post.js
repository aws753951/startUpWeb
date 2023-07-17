const router = require("express").Router();

router.get("/", (req, res) => {
  let email = req.user.email;
  res.send(email);
});

module.exports = router;
