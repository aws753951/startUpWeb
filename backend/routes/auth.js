const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user_model");
const nodemailer = require("nodemailer");

router.get("/google", passport.authenticate("google"));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      const email = req.user.emails[0].value;
      const foundUser = await User.findOne({ email });
      if (!foundUser) {
        console.log("no user");
        let newUser = new User({ email });
        await newUser.save();
      } else {
        console.log(foundUser);
      }

      const token = jwt.sign({ email }, process.env.PASSPORT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      res.redirect(`${process.env.CLIENT_URL}auth/setjwt/?token=JWT ${token}`);
    } catch (e) {
      console.log(e);
      res.redirect(`${process.env.CLIENT_URL}?trouble=true`);
    }
  }
);

router.post("/register", async (req, res) => {
  try {
    // 記得補joi
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res
        .status(401)
        .send("email has been registered or maybe try login with google");
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const token = jwt.sign(
      { email, password: hashPassword },
      process.env.PASSPORT_SECRET,
      { expiresIn: 60 * 10 }
    );
    // sendemail
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "zhuhongcheng1124@gmail.com",
        pass: process.env.GOOGLE_MAIL_PASSOWRD,
      },
    });
    const options = {
      from: "startupwebsite@gmail.com",
      to: email,
      subject: "薪水網會員註冊認證",
      html: `<h2>打工人，打工魂，打工都是人上人，我們要悄悄地打工，然後驚艷所有人</h2>\
       <p>打工人的傲氣從這一步開啟，請於註冊10分鐘內點擊註冊認證的<a href="${process.env.CLIENT_URL}auth/confirm/?token=${token}" title="${process.env.CLIENT_URL}auth/confirm/?token=${token}">網址</a> 薪資透明是打工人的驕傲，在未推倒資本主義的高牆前，我會義無反顧維護打工人最後的尊嚴</p>`,
    };
    transporter.sendMail(options, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("訊息發送: " + info.response);
      }
    });
    res.status(200).send("email sent");
  } catch (e) {
    console.log(e);
    return res.status(500).send("trouble with building token or sending email");
  }
});

router.get("/confirm/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const decode = jwt.verify(token, process.env.PASSPORT_SECRET);
    const email = decode.email;
    const password = decode.password;

    let foundUser = await User.findOne({ email });
    if (foundUser) {
      console.log("user exist");
      return res.status(403).send("User has already been registered");
    } else {
      console.log("Creating a new user...");
      let newUser = new User({ email, password });
      await newUser.save();
      return res.status(200).send("User has been saved");
    }
  } catch (e) {
    console.log(e);
    return res.status(403).send("Trouble with token or saving user into DB");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(401).send("Could'nt find email");
    }
    bcrypt.compare(password, foundUser.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ email }, process.env.PASSPORT_SECRET, {
          expiresIn: 60 * 60 * 24,
        });
        return res.status(200).send(`JWT ${token}`);
      } else {
        return res.status(401).send("user's password is wrong ");
      }
    });
  } catch (e) {
    console.log(e);
    return res.send("trouble with finding user or password");
  }
});

module.exports = router;
