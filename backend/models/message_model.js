const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    conversationId: mongoose.Schema.Types.ObjectId,
    message: String,
    IP: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
