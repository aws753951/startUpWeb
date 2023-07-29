const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 50,
    },
    password: {
      type: String,
      minlength: 6,
      maxlength: 100,
    },
    username: {
      type: String,
      default: "Anonymous",
    },
    IP: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
