import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import Comments from "./Comments";
import moment from "moment";
import "moment/locale/zh-tw";
import axios from "axios";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

// 該data為jobposts當中每一則內容
const Post = ({ data, meet }) => {
  const navigate = useNavigate();
  const user_id = JSON.parse(localStorage.getItem("session_user_id"));
  let jwt_token = JSON.parse(localStorage.getItem("jwt_token"));

  let [good, setGood] = useState(data.good.includes(user_id));
  let [bad, setBad] = useState(data.bad.includes(user_id));

  let [goodCount, setGoodCount] = useState(data.good.length);
  let [badCount, setBadCount] = useState(data.bad.length);

  let [openDetail, setOpenDetail] = useState(false);

  let [commentOpen, setCommentOpen] = useState(false);
  let [comments, setComments] = useState("");

  let data_;
  if (!meet) {
    data_ = [
      {
        subject: "滿意度",
        A: data.satisfaction,
        fullMark: 5,
      },
      {
        subject: "企業氛圍",
        A: data.environ,
        fullMark: 5,
      },

      {
        subject: "輕鬆程度",
        A: data.easy,
        fullMark: 5,
      },
      {
        subject: "Loading",
        A: data.loading,
        fullMark: 5,
      },
      {
        subject: "加班程度",
        A: data.addworkhour / 4,
        fullMark: 5,
      },
    ];
  }

  const handleGetMessage = async () => {
    setCommentOpen(!commentOpen);

    // 跟 "" 搭配是因為 !"" 會啟動，但 ![] 不會啟動 => 讓真的沒留言的文章僅跟DB互動一次，避免重複互動

    if (!comments) {
      try {
        let result;
        if (!meet) {
          result = await axios.post(
            process.env.REACT_APP_DB_URL + "/search/comments",
            { article_id: data._id }
          );
        } else {
          result = await axios.post(
            process.env.REACT_APP_DB_URL + "/search/comments",
            { meetArticle_id: data._id }
          );
        }

        setComments(result.data);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleAgree = async () => {
    try {
      if (bad) {
        setBad(!bad);
        setBadCount((prev) => {
          return prev - 1;
        });
      }
      if (good) {
        setGoodCount((prev) => {
          return prev - 1;
        });
      } else {
        setGoodCount((prev) => {
          return prev + 1;
        });
      }
      setGood(!good);
      if (!meet) {
        await axios.post(
          process.env.REACT_APP_DB_URL + "/post/article/agree",
          {
            article_id: data._id,
          },
          {
            headers: {
              Authorization: jwt_token,
            },
          }
        );
      } else {
        await axios.post(
          process.env.REACT_APP_DB_URL + "/post/article/agree",
          {
            meetArticle_id: data._id,
          },
          {
            headers: {
              Authorization: jwt_token,
            },
          }
        );
      }
    } catch (e) {
      console.log(e);
      window.alert("要按讚請先登入");
      navigate("/login");
    }
  };

  const handleDisAgree = async () => {
    try {
      // 計算數量
      if (good) {
        setGood(!good);
        setGoodCount((prev) => {
          return prev - 1;
        });
      }
      if (bad) {
        setBadCount((prev) => {
          return prev - 1;
        });
      } else {
        setBadCount((prev) => {
          return prev + 1;
        });
      }
      // 調整現在按下的狀況
      setBad(!bad);
      if (!meet) {
        await axios.post(
          process.env.REACT_APP_DB_URL + "/post/article/disagree",
          {
            article_id: data._id,
          },
          {
            headers: {
              Authorization: jwt_token,
            },
          }
        );
      } else {
        await axios.post(
          process.env.REACT_APP_DB_URL + "/post/article/disagree",
          {
            meetArticle_id: data._id,
          },
          {
            headers: {
              Authorization: jwt_token,
            },
          }
        );
      }
    } catch (e) {
      console.log(e);
      window.alert("要倒讚請先登入");
      navigate("/login");
    }
  };

  return (
    <div className={`shadow-lg rounded-[10px] bg-white overflow-hidden`}>
      <div className="container p-[20px]">
        <div className="flex justify-between items-center pb-2">
          <div className="flex items-center  gap-[10px]">
            <img
              className="w-[40px] h-[40px] object-cover rounded-full"
              src={require("../assets/photo.png")}
              alt=""
            />
            <div className="details flex flex-col">
              <span className="name font-bold text-[24px]">
                {data.username}
              </span>
              <div className="flex items-center gap-[20px]">
                <span className="date font-bold text-[14px]">
                  {moment(data.createdAt).fromNow()}
                </span>
                <span className="date  text-[12px]">
                  {moment(data.createdAt).format("YYYY-MM-DD HH:mm")}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div>
              {!meet ? "職位名稱: " : "應徵職位: "}
              {data.jobname}
            </div>

            <div>
              {!meet ? "現職年薪: " : "前職年薪: "}
              {data.yearwage ? data.yearwage + " 萬" : "不透露"}
            </div>
            {meet && <div>相關年資: {data.seniority}年</div>}
            {meet && <div>面試滿意度: {data.satisfaction}星</div>}
            {!meet && (
              <div
                onClick={() => {
                  setOpenDetail(!openDetail);
                }}
                className="cursor-pointer font-bold bg-blue-300 p-1 text-center w-[90px] rounded-[10px]"
              >
                {openDetail ? "收起細節" : "其他細節"}
              </div>
            )}
          </div>
        </div>

        {openDetail && (
          <div
            className={`mb-2 bg-blue-100 rounded-[10px] p-2 flex justify-between `}
          >
            <div>
              <div>職務等級: {data.level}</div>
              <div>相關年資: {data.seniority} 年</div>
              <div>現職年資: {data.curseniority} 年</div>
              <div>月薪: {data.monthwage} 萬</div>
              <div>日工時: {data.workhour} 小時</div>
              <div>月加班: {data.addworkhour} 小時</div>
            </div>
            <div className="  w-[150px]  relative ">
              <ResponsiveContainer
                className={"absolute top-0 right-0"}
                width="150%"
                height={120}
              >
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  className="text-[10px]"
                  data={data_}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={18} domain={[0, 5]} />
                  <Radar
                    name="本公司"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />

                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div className="font-bold break-words text-[30px]">{data.oneword}</div>
        <div className="break-words whitespace-pre-line content pb-2 text-[20px] border-b-4">
          <p>{data.experience}</p>
        </div>
        <div className="info flex items-center gap-[20px] pt-2">
          <div onClick={handleAgree} className="flex cursor-pointer gap-[5px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={`${good ? "green" : "none"}`}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-6 h-6 ${good ? "text-green-700" : "text-black"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              />
            </svg>
            <span className={` ${good ? "text-green-700" : "text-black"}`}>
              同意
            </span>
            <span>{goodCount}</span>
          </div>
          <div className="cursor-pointer" onClick={handleGetMessage}>
            <TextsmsOutlinedIcon />
            <span> {data.comments.length} 留言</span>
          </div>
          <div
            onClick={handleDisAgree}
            className="flex cursor-pointer gap-[5px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={`${bad ? "red" : "none"}`}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-6 h-6 ${bad ? "text-red-500" : "text-black"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
              />
            </svg>
            <span className={`${bad ? "text-red-500" : "text-black"}`}>
              不同意
            </span>
            <span>{badCount}</span>
          </div>
        </div>
      </div>
      {commentOpen && (
        <Comments
          comments={comments}
          setComments={setComments}
          article_id={data._id}
          meet={meet}
        />
      )}
    </div>
  );
};

export default Post;
