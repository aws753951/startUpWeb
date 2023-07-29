const mongoose = require("mongoose");
const { Schema } = mongoose;

const meetPostSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    companyName: { type: String, minlength: 1, maxlength: 50, required: true },
    jobname: { type: String, minlength: 1, maxlength: 50, required: true },
    seniority: { type: Number, minimum: 0, maximum: 20, required: true },
    yearwage: { type: Number, minimum: 30, maximum: 2000 },
    satisfaction: { type: Number, minimum: 1, maximum: 5, required: true },
    experience: {
      type: String,
      minlength: 1,
      maxlength: 10000,
      required: true,
    },
    oneword: { type: String, maxlength: 50, required: true },
    good: { type: [mongoose.Schema.Types.ObjectId] },
    bad: { type: [mongoose.Schema.Types.ObjectId] },
    comments: { type: Array, default: [] },
    date: { type: Date, default: "" },
    hidden: { type: Boolean, default: false },
    IP: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("MeetPost", meetPostSchema);
