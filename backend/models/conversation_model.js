const mongoose = require("mongoose");
const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    roomname: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
