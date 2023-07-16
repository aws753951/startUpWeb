const express = require("express");
const app = express();
const passport = require("passport");
const cookieSession = require("cookie-session");
const cors = require("cors");
require("dotenv").config();
require("./config/passport");
const authRoute = require("./routes/auth");

app.use(
  cookieSession({
    name: "session",
    // secret
    keys: [process.env.COOKIESESSIONSECRET],
    // one day
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.listen("8080", () => console.log(`8080 running`));
