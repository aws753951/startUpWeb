const router = require("express").Router();
const passport = require("passport");

router.get("/login/success", (req, res) => {
  // 成功時會使req賦予user這個屬性
  if (req.user) {
  }
  res.status(200).send(req.user);
});

router.get("/login/failed", (req, res) => {
  res.status(401).send("logining failed");
});

router.get("/google", passport.authenticate("google"));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
