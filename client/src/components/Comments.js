import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import moment from "moment";
import "moment/locale/zh-tw";

const Comments = ({ comments, article_id }) => {
  const [message, setMessage] = useState("");
  const handleMessage = async () => {
    let jwt_token = JSON.parse(localStorage.getItem("jwt_token"));
    if (message) {
      await axios.post(
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
    }
  };
  // const comments = [
  //   {
  //     id: 1,
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
  //     name: "John Doe",
  //     userId: 1,
  //     profilePicture:
  //       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
  //     name: "Jane Doe",
  //     userId: 2,
  //     profilePicture:
  //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //   },
  // ];

  return (
    <div>
      <div className="comments px-[20px] pb-[20px] max-h-[500px] overflow-scroll no-scrollbar">
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
                    <div>{key + 1 + "F"}</div>
                  </div>
                  <div className="break-words ">{comment.message}</div>
                </div>
                <div className="relative group flex">
                  <div>{moment(parseInt(comment.date)).fromNow()}</div>
                  <p className="absolute top-[20px] right-0 text-[10px]  bg-slate-500 p-[4px] rounded-[10px] text-white hidden group-hover:block">
                    {moment(parseInt(comment.date)).format("MM-DD")}
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
