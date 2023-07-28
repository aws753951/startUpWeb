const router = require("express").Router();
const Post = require("../models/post_model");
const MeetPost = require("../models/meetPost_model");
const Company = require("../models/company_model");
const User = require("../models/user_model");
// const Conversation = require("../models/conversation_model");
const Message = require("../models/message_model");

const jobPostValidation = require("../validation").jobPostValidation;
const meetPostValidation = require("../validation").meetPostValidation;
const companyPostValidation = require("../validation").companyPostValidation;

router.get("/", (req, res) => {
  let { email, user_id } = req.user;
  return res.send({ email, user_id });
});

// 創建新的公司資訊
router.post("/company", async (req, res) => {
  try {
    const { user_id } = req.user;
    const foundUser = await User.findOne({ _id: user_id });
    if (!foundUser) {
      return res.status(403).send("can't find User");
    }

    let { error } = companyPostValidation(req.body);
    if (error) {
      return res.status(403).send(error.details[0].message);
    }

    const { name, url } = req.body;
    let foundCompany = await Company.findOne({ name });
    if (foundCompany) {
      return res.status(403).send("company exists");
    }
    let newCompany = new Company({ name, url });
    await newCompany.save();
    return res.status(200).send("company successfully saved");
  } catch (e) {
    console.log(e);
    return res.status(403).send("company not saved");
  }
});

router.post("/article/post", async (req, res) => {
  try {
    // joi
    let { error } = jobPostValidation(req.body);
    if (error) {
      return res.status(403).send(error.details[0].message);
    }

    let foundCompany = await Company.findOne({ _id: req.body.companyId });
    if (!foundCompany) {
      return res.status(403).send("company not found");
    }
    const { user_id } = req.user;
    const foundUser = await User.findOne({ _id: user_id });
    if (!foundUser) {
      return res.status(403).send("can't find User");
    }
    const { id, username } = foundUser;
    let object = {
      ...req.body,
      user: id,
      username,
      companyName: foundCompany.name,
    };

    const newPost = new Post(object);
    let savedPost = await newPost.save();

    // 替公司schema新增公司發文/薪水/評估
    await Company.findOneAndUpdate(
      { _id: req.body.companyId },
      {
        $push: {
          jobposts: { $each: [savedPost._id], $position: 0 },
          wageandseniority: {
            article_id: savedPost._id,
            data: {
              yearwage: req.body.yearwage,
              seniority: req.body.seniority,
            },
          },
          evaluation: {
            article_id: savedPost._id,
            data: {
              loading: req.body.loading,
              environ: req.body.environ,
              satisfaction: req.body.satisfaction,
              easy: req.body.easy,
              addworkhour: req.body.addworkhour,
            },
          },
        },
      }
    );

    return res.status(200).send("article successfully saved");
  } catch (e) {
    console.log(e);
    return res.status(403).send("article not saved");
  }
});

router.post("/meetArticle/post", async (req, res) => {
  try {
    // joi
    let { error } = meetPostValidation(req.body);
    if (error) {
      return res.status(403).send(error.details[0].message);
    }

    let foundCompany = await Company.findOne({ _id: req.body.companyId });
    if (!foundCompany) {
      return res.status(403).send("company not found");
    }

    const { user_id } = req.user;
    const foundUser = await User.findOne({ _id: user_id });
    if (!foundUser) {
      return res.status(403).send("can't find User");
    }

    const { id, username } = foundUser;
    let object = {
      ...req.body,
      user: id,
      username,
      companyName: foundCompany.name,
    };

    const newMeetPost = new MeetPost(object);
    let savedMeetPost = await newMeetPost.save();

    await Company.findOneAndUpdate(
      { _id: req.body.companyId },
      {
        $push: {
          meetposts: { $each: [savedMeetPost._id], $position: 0 },
        },
      }
    );

    return res.status(200).send("article successfully saved");
  } catch (e) {
    console.log(e);
    return res.status(403).send("article not saved");
  }
});

// 針對特定文章進行留言
router.post("/article", async (req, res) => {
  const { user_id } = req.user;
  const foundUser = await User.findOne({ _id: user_id });
  if (!foundUser) {
    return res.status(403).send("can't find User");
  }
  const date = Date.now();
  const { article_id, meetArticle_id, message } = req.body;
  try {
    const foundUser = await User.findOne({ _id: user_id });
    const username = foundUser.username;

    if (article_id) {
      let result = await Post.findByIdAndUpdate(
        { _id: article_id },
        {
          $push: {
            comments: { user_id, username, message, date: date.toString() },
          },
        },

        // 得寫在push的後面
        { new: true }
      );
      if (!result) {
        return res.status(403).send("cant find or update article");
      }
      return res
        .status(200)
        .send({ user_id, username, message, date: date.toString() });
    } else if (meetArticle_id) {
      let result = await MeetPost.findByIdAndUpdate(
        { _id: meetArticle_id },
        {
          $push: {
            comments: { user_id, username, message, date: date.toString() },
          },
        },
        { new: true }
      );
      if (!result) {
        return res.status(403).send("cant find or update article");
      }
      return res
        .status(200)
        .send({ user_id, username, message, date: date.toString() });
    }
  } catch (e) {
    console.log(e);
    return res.status(403).send("message not saved");
  }
});

// 針對特定文章進行同意或不同意
router.post("/article/agree", async (req, res) => {
  try {
    const { user_id } = req.user;
    const foundUser = await User.findOne({ _id: user_id });
    if (!foundUser) {
      return res.status(403).send("can't find User");
    }
    const { article_id, meetArticle_id } = req.body;
    if (article_id) {
      const AgreePost = await Post.findOne({ _id: article_id, good: user_id });
      const DisAgreePost = await Post.findOne({
        _id: article_id,
        bad: user_id,
      });
      if (AgreePost && !DisAgreePost) {
        await Post.findOneAndUpdate(
          { _id: article_id },
          { $pull: { good: user_id } }
        );
      } else if (!AgreePost && DisAgreePost) {
        await Post.findOneAndUpdate(
          { _id: article_id },
          { $pull: { bad: user_id }, $push: { good: user_id } }
        );
      } else if (!AgreePost && !DisAgreePost) {
        await Post.findOneAndUpdate(
          { _id: article_id },
          { $push: { good: user_id } }
        );
      }

      return res.status(200).send("handle agree successfully");
    } else if (meetArticle_id) {
      const AgreeMeetPost = await MeetPost.findOne({
        _id: meetArticle_id,
        good: user_id,
      });
      const DisAgreeMeetPost = await MeetPost.findOne({
        _id: meetArticle_id,
        bad: user_id,
      });
      if (AgreeMeetPost && !DisAgreeMeetPost) {
        await MeetPost.findOneAndUpdate(
          { _id: meetArticle_id },
          { $pull: { good: user_id } }
        );
      } else if (!AgreeMeetPost && DisAgreeMeetPost) {
        await MeetPost.findOneAndUpdate(
          { _id: meetArticle_id },
          { $pull: { bad: user_id }, $push: { good: user_id } }
        );
      } else if (!AgreeMeetPost && !DisAgreeMeetPost) {
        await MeetPost.findOneAndUpdate(
          { _id: meetArticle_id },
          { $push: { good: user_id } }
        );
      }

      return res.status(200).send("handle agree successfully");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("something wrong with sending agree");
  }
});

// 針對特定文章進行同意或不同意
router.post("/article/disagree", async (req, res) => {
  try {
    const { user_id } = req.user;
    const foundUser = await User.findOne({ _id: user_id });
    if (!foundUser) {
      return res.status(403).send("can't find User");
    }
    const { article_id, meetArticle_id } = req.body;
    if (article_id) {
      const AgreePost = await Post.findOne({ _id: article_id, good: user_id });
      const DisAgreePost = await Post.findOne({
        _id: article_id,
        bad: user_id,
      });

      if (AgreePost && !DisAgreePost) {
        await Post.findOneAndUpdate(
          { _id: article_id },
          { $pull: { good: user_id }, $push: { bad: user_id } }
        );
      } else if (!AgreePost && DisAgreePost) {
        await Post.findOneAndUpdate(
          { _id: article_id },
          { $pull: { bad: user_id } }
        );
      } else if (!AgreePost && !DisAgreePost) {
        await Post.findOneAndUpdate(
          { _id: article_id },
          { $push: { bad: user_id } }
        );
      }

      return res.status(200).send("handle disagree successfully");
    } else if (meetArticle_id) {
      const AgreeMeetPost = await MeetPost.findOne({
        _id: meetArticle_id,
        good: user_id,
      });
      const DisAgreeMeetPost = await MeetPost.findOne({
        _id: meetArticle_id,
        bad: user_id,
      });

      if (AgreeMeetPost && !DisAgreeMeetPost) {
        await MeetPost.findOneAndUpdate(
          { _id: meetArticle_id },
          { $pull: { good: user_id }, $push: { bad: user_id } }
        );
      } else if (!AgreeMeetPost && DisAgreeMeetPost) {
        await MeetPost.findOneAndUpdate(
          { _id: meetArticle_id },
          { $pull: { bad: user_id } }
        );
      } else if (!AgreeMeetPost && !DisAgreeMeetPost) {
        await MeetPost.findOneAndUpdate(
          { _id: meetArticle_id },
          { $push: { bad: user_id } }
        );
      }

      return res.status(200).send("handle disagree successfully");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("something wrong with sending disagree");
  }
});

// 新增會議室，新增完就可以關掉了
// router.post("/conversation", async (req, res) => {
//   try {
//     let newConversation = new Conversation({});
//     let savedConversation = await newConversation.save();
//     return res.status(200).send(savedConversation);
//   } catch (e) {
//     console.log(e);
//     return res.status(500).send("something wrong with build conversation");
//   }
// });

router.post("/message", async (req, res) => {
  try {
    // 由 "user_id""message""conversationId" 組成Message，username由search的路徑populate呈現出來
    const { user_id } = req.user; // jwt提供

    // jwt是合法的，但使用者已經被刪除了
    const foundUser = await User.findOne({ _id: user_id });
    if (!foundUser) {
      return res.status(403).send("can't find User");
    }
    const { message } = req.body;
    const conversationId = "64c2a80c697e2d0c10a34e61"; //目前僅開放一個chatroot
    let newMessage = new Message({ user_id, message, conversationId });
    let savedMessage = await newMessage.save();
    return res.status(200).send(savedMessage);
  } catch (e) {
    console.log(e);
    return res.status(500).send("something wrong with sending message.");
  }
});

module.exports = router;
