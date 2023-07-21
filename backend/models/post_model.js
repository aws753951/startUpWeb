const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: String },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    jobname: { type: String, required: true },
    level: { type: String, required: true },
    seniority: { type: Number, required: true },
    curseniority: { type: Number, required: true },
    monthwage: { type: Number, required: true },
    yearwage: { type: Number, required: true },
    workhour: { type: Number, required: true },
    addworkhour: { type: Number, required: true },
    easy: { type: Number, required: true },
    loading: { type: Number, required: true },
    environ: { type: Number, required: true },
    statisfication: { type: Number, required: true },
    experience: { type: String, required: true },
    oneword: { type: String, required: true },
    good: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    bad: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    comments: { type: Array, default: [] },
    date: { type: Date, default: "" },
    hidden: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
