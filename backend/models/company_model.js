const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema(
  {
    name: {
      type: String,
      minlength: 1,
      maxlength: 100,
      trim: true,
      required: true,
    },
    url: {
      type: String,
      minlength: 1,
      maxlength: 200,
      required: true,
    },
    jobposts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", // "Post" 是 postSchema 的集合名稱
      },
    ],
    meetposts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MeetPost",
      },
    ],
    wageandseniority: [
      { article_id: String, data: { yearwage: Number, seniority: Number } },
    ],
    evaluation: [
      {
        article_id: String,
        data: {
          loading: Number,
          environ: Number,
          satisfaction: Number,
          easy: Number,
          addworkhour: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
