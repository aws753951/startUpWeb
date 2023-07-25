import React, { useState } from "react";
import Message from "./Message";
import TextareaAutosize from "react-textarea-autosize";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Chat = () => {
  let [shrink, setShrink] = useState(false);

  const mes = [
    {
      sender: "123",
      text: "甜甜甜xxxxxxxxxxxxxxx",
      createdAt: "2023-07-13T07:45:58.379+00:00",
    },
    {
      sender: "456",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab similique laborum provident vel reprehenderit inventore corrupti consequatur ratione magni consequuntur iure perferendis repellat at ut sed aspernatur beatae, cum tempore mollitia sit ea nisi. Dicta, obcaecati. Corporis laboriosam aut dolorum optio id qui facere, voluptatem odio necessitatibus? In, doloribus labore.",
      createdAt: "2023-07-13T07:52:01.622+00:00",
    },
    {
      sender: "456",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab similique laborum provident vel reprehenderit inventore corrupti consequatur ratione magni consequuntur iure perferendis repellat at ut sed aspernatur beatae, cum tempore mollitia sit ea nisi. Dicta, obcaecati. Corporis laboriosam aut dolorum optio id qui facere, voluptatem odio necessitatibus? In, doloribus labore.",
      createdAt: "2023-07-13T07:52:01.622+00:00",
    },
    {
      sender: "123",
      text: "甜甜甜xxxxxxxxxxxxxxx",
      createdAt: "2023-07-13T07:45:58.379+00:00",
    },
  ];

  const navigate = useNavigate();
  const handleMessage = async () => {
    let jwt_token = JSON.parse(localStorage.getItem("jwt_token"));
    console.log(jwt_token);
    if (!jwt_token) {
      window.alert("要留言請先登入");
      navigate("/login");
    } else {
      try {
        let ans = await axios.get(`${process.env.REACT_APP_DB_URL}/post`, {
          headers: {
            Authorization: jwt_token,
          },
        });
        console.log(ans);
      } catch (e) {
        window.alert("session過期，幫你重新導向登入頁面");
        navigate("/login");
      }
    }
  };

  return (
    <div className="mt-2 shadow-lg bg-white rounded-[10px] py-1 ">
      <div className="flex items-center justify-between">
        <div className="font-bold text-[24px] ml-2">社畜廣場</div>

        {!shrink && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mr-2 cursor-pointer"
            onClick={() => {
              setShrink(!shrink);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
            />
          </svg>
        )}
        {shrink && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6  mr-2 cursor-pointer"
            onClick={() => {
              setShrink(!shrink);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>
        )}
      </div>
      <div className={` ${!shrink ? "block" : "hidden"}`}>
        <div className="p-[10px] bg-blue-200  flex flex-col gap-[10px] h-[calc(100vh-227px)] overflow-scroll no-scrollbar">
          {mes.map((c, i) => (
            <Message mes={c} key={i} own={false} />
          ))}
        </div>
        <div className="p-5 flex items-end gap-2 ">
          <TextareaAutosize
            placeholder="在想甚麼?"
            className="w-full outline-none bg-slate-200 overflow-hidden resize-none py-[10px] px-[20px] rounded-[20px]"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mb-[10px] cursor-pointer "
            onClick={handleMessage}
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

export default Chat;
