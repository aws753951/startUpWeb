const express = require("express");
const app = express();
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();
require("./config/passport");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const morgan = require("morgan");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.ATLAS)
  .then(() => {
    console.log("connect to ATLAS");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json()); //解析JSON格式的請求，並把其附加到req.body
app.use(express.urlencoded({ extended: true })); //解析post當中的參數(x-www-form-urlencoded)，附加到req.body
app.use(morgan("common")); //後續可針對使用者搜尋做log
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.use(
  "/post",
  // 他會去找require("./config/passport")(passport)當中的passport.use(new JwtStrategy)
  passport.authenticate("jwt", { session: false }),
  postRoute
);

app.listen("8080", () => console.log(`8080 running`));
