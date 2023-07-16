const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/google", passport.authenticate("google"));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const email = req.user.emails[0].value;
    const token = jwt.sign({ email }, process.env.PASSPORT_SECRET);
    res.redirect(`${process.env.CLIENT_URL}?token=JWT ${token}`);
  }
);

module.exports = router;
