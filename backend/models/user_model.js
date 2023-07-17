const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50,
  },
  password: {
    type: String,
  },
  username: {
    type: String,
    default: "Anonymous",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
