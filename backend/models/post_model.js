const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
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
    level: { type: String, minlength: 1, maxlength: 50, required: true },
    seniority: { type: Number, minimum: 0, maximum: 20, required: true },
    curseniority: { type: Number, minimum: 0, maximum: 20, required: true },
    monthwage: { type: Number, minimum: 2.6, maximum: 100, required: true },
    yearwage: { type: Number, minimum: 30, maximum: 2000, required: true },
    workhour: { type: Number, minimum: 4, maximum: 24, required: true },
    addworkhour: { type: Number, minimum: 0, maximum: 20, required: true },
    easy: { type: Number, minimum: 1, maximum: 5, required: true },
    loading: { type: Number, minimum: 1, maximum: 5, required: true },
    environ: { type: Number, minimum: 1, maximum: 5, required: true },
    satisfaction: { type: Number, minimum: 1, maximum: 5, required: true },
    experience: {
      type: String,
      minlength: 1,
      maxlength: 10000,
      required: true,
    },
    oneword: { type: String, maxlength: 50 },
    good: { type: [mongoose.Schema.Types.ObjectId] },
    bad: { type: [mongoose.Schema.Types.ObjectId] },
    comments: { type: Array, default: [] },
    date: { type: Date, default: "" },
    hidden: { type: Boolean, default: false },
    IP: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
