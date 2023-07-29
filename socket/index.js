const io = require("socket.io")(6969, {
  // 同源政策，要讓其接受前端該domain與port，才會通
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket) => {
  socket.on("sendText", ({ message, user_id, createdAt }) => {
    io.emit("getMessage", { message, user_id, createdAt });
  });
});
