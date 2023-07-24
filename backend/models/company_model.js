const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    url: {
      type: String,
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
        ref: "Post", // "Post" 是 postSchema 的集合名稱
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
