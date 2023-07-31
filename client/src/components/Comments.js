import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import moment from "moment";
import "moment/locale/zh-tw";

const Comments = ({ meet, comments, setComments, article_id }) => {
  let meetArticle_id;
  if (meet) {
    meetArticle_id = article_id;
  }
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [sorting, setSorting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleMessage = async () => {
    let jwt_token = JSON.parse(localStorage.getItem("jwt_token"));
    if (!jwt_token) {
      window.alert("要留言請先登入");
      navigate("/login");
      return;
    }
    try {
      // 有輸入內容才會送給後端
      if (message && !isSubmitted) {
        setIsSubmitted(true);
        let response;
        if (!meet) {
          response = await axios.post(
            process.env.REACT_APP_DB_URL + "/post/article",
            {
              article_id,
              message,
            },
            // headers得寫在body後面
            {
              headers: {
                Authorization: jwt_token,
              },
            }
          );
        } else {
          response = await axios.post(
            process.env.REACT_APP_DB_URL + "/post/article",
            {
              meetArticle_id,
              message,
            },
            // headers得寫在body後面
            {
              headers: {
                Authorization: jwt_token,
              },
            }
          );
        }
        setMessage("");
        if (!sorting) {
          setComments([...comments, response.data]);
        } else {
          setComments([response.data, ...comments]);
        }
        setIsSubmitted(false);
      }
    } catch (e) {
      console.log(e);
      if (e.response.data === "Unauthorized") {
        window.alert("session錯誤，請你重新登入");
        navigate("/login");
        return;
      }
      window.alert(e.response.data);
      setIsSubmitted(false);
    }
  };

  const handleSort = () => {
    setSorting(!sorting);
    comments.reverse();
  };

  return (
    <div>
      <div className="comments px-[20px] pb-[20px] max-h-[500px] overflow-scroll no-scrollbar">
        <div
          onClick={handleSort}
          className="text-end cursor-pointer font-bold text-gray-500"
        >
          {!sorting ? "最新留言" : "預設排序"}
        </div>

        {comments &&
          comments.map((comment, key) => (
            <div
              key={key}
              className="comment flex items-center gap-[10px] mt-2"
            >
              <img
                className="w-[40px] h-[40px] object-cover rounded-full shrink-0"
                src={require("../assets/photo.png")}
                alt=""
              />
              <div className="flex w-full gap-3">
                <div className=" bg-slate-100 max-w-[60%] p-2 rounded-[10px] ">
                  <div className="info flex gap-3 ">
                    <div className="font-bold">{comment.username}</div>
                    {/* <div>{key + 1 + "F"}</div> */}
                  </div>
                  <div className="break-words ">{comment.message}</div>
                </div>
                <div className="relative w-[150px] group flex">
                  <div>{moment(parseInt(comment.date)).fromNow()}</div>
                  <p className="absolute  top-[25px] text-[10px]  bg-slate-500 p-[4px] rounded-[5px] text-white hidden group-hover:block">
                    {moment(parseInt(comment.date)).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="write flex items-center gap-3 border-t-2 shadow-xl p-[20px]">
        <img
          className="w-[40px] h-[40px] object-cover rounded-full shrink-0"
          src={require("../assets/photo.png")}
          alt=""
        />
        <div className=" flex w-full items-end ">
          <TextareaAutosize
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
            className="w-full outline-none bg-slate-200 p-[10px] rounded-[10px]  overflow-hidden resize-none"
            placeholder="你在想甚麼?"
          />
          <svg
            onClick={handleMessage}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mx-2 mb-2 text-3xl cursor-pointer "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Comments;
