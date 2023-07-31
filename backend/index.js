const express = require("express");
const app = express();
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();
require("./config/passport");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const searchRoute = require("./routes/search");
const deleteRoute = require("./routes/delete");
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
app.use(cors({ origin: process.env.CLIENT_URL }));

app.set("trust proxy", true); // 设置 trust proxy，信任代理服务器

app.use((req, res, next) => {
  function getClientIp(req) {
    if (req.headers["x-forwarded-for"]) {
      // try to get from x-forwared-for if it set (behind reverse proxy)
      return req.headers["x-forwarded-for"].split(",")[0];
    } else if (req.connection && req.connection.remoteAddress) {
      // no proxy, try getting from connection.remoteAddress
      return req.connection.remoteAddress;
    } else if (req.socket) {
      // try to get it from req.socket
      return req.socket.remoteAddress;
    } else if (req.connection && req.connection.socket) {
      // try to get it form the connection.socket
      return req.connection.socket.remoteAddress;
    } else {
      // if non above, fallback.
      return req.ip;
    }
  }

  req.userIP = getClientIp(req);
  next();
});

app.use("/auth", authRoute);

app.use(
  "/post",
  // 他會去找require("./config/passport")(passport)當中的passport.use(new JwtStrategy)
  passport.authenticate("jwt", { session: false }),
  postRoute
);

app.use("/search", searchRoute);

app.use(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  deleteRoute
);

const server = app.listen("8080", () => console.log(`8080 running`));

const io = require("socket.io")(server, {
  // 同源政策，要讓其接受前端該domain與port，才會通
  cors: { origin: process.env.CLIENT_URL },
});

io.on("connection", (socket) => {
  socket.on("sendText", ({ message, user_id, createdAt }) => {
    io.emit("getMessage", { message, user_id, createdAt });
  });
});
