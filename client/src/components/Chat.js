import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import TextareaAutosize from "react-textarea-autosize";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const Chat = ({ user }) => {
  const navigate = useNavigate();
  const [shrink, setShrink] = useState(true);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [chatmsg, setChatmsg] = useState([]);
  const [toScroll, setToScroll] = useState(true); // 讓加載更多的時候，不會讓聊天滾到最下面，做個一次性開關
  const socket = useRef();
  const chatBoxRef = useRef(null); // 建立對話框的引用
  const [arrive, setArrive] = useState(null);

  useEffect(() => {
    socket.current = io("ws://localhost:6969");
    socket.current.on("getMessage", (data) => {
      // data是 object
      setArrive(data);
    });
  }, []);

  useEffect(() => {
    arrive && setChatmsg((prev) => [...prev, arrive]);
  }, [arrive]);

  useEffect(() => {
    if (chatBoxRef.current && toScroll) {
      chatBoxRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatmsg, toScroll]);

  const handleShrink = async () => {
    setShrink(!shrink);
    const messageDetail = await axios.get(
      process.env.REACT_APP_DB_URL + "/search/sortmessage?page=0"
    );

    setChatmsg(messageDetail.data.reverse());
  };

  const handleMessage = async () => {
    let jwt_token = JSON.parse(localStorage.getItem("jwt_token"));
    if (!jwt_token) {
      window.alert("要留言請先登入");
      navigate("/login");
    } else {
      try {
        if (!message) {
          return;
        }
        setToScroll(true);
        await axios.post(
          `${process.env.REACT_APP_DB_URL}/post/message`,
          { message },
          {
            headers: {
              Authorization: jwt_token,
            },
          }
        );

        // 設定傳到socket伺服器，記得於前面useEffect去接收
        // 之後使用者名稱要依照自己的去調整時再調整
        socket.current.emit("sendText", {
          message,
          user_id: { _id: user, username: "Anonymous" },
          createdAt: Date.now(),
        });

        setMessage("");
      } catch (e) {
        window.alert("session過期，幫你重新導向登入頁面");
        navigate("/login");
      }
    }
  };

  const handleMore = async () => {
    setToScroll(false);
    setPage((prev) => prev + 1);
    const messageDetail = await axios.get(
      process.env.REACT_APP_DB_URL + `/search/sortmessage?page=${page}`
    );
    setChatmsg((prev) => messageDetail.data.reverse().concat(prev));
  };

  const handleKeyDown = (event) => {
    // 如果按下的是 Enter 鍵（keyCode 為 13），就阻止預設行為
    if (event.keyCode === 13) {
      // 按下shift enter 則不送出，則發揮TextareaAutosize本身的效果
      if (event.shiftKey) {
        return;
      }
      event.preventDefault();
      // 在這裡可以執行送出訊息的相關邏輯，例如呼叫 sendMessage 函數
      handleMessage();
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
            onClick={handleShrink}
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
            onClick={handleShrink}
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
        <div className="p-[10px]  bg-blue-200  flex flex-col gap-[10px] h-[calc(100vh-227px)] overflow-y-auto no-scrollbar">
          <div
            onClick={handleMore}
            className="text-center cursor-pointer text-gray-500"
          >
            看更多
          </div>
          {chatmsg &&
            chatmsg.length > 0 &&
            chatmsg.map((msg, i) => (
              <div key={i}>
                <Message
                  msg={msg}
                  // 因應使用者可能被刪除，但仍然存在於資料庫中的紀錄
                  own={msg.user_id ? user === msg.user_id._id : false}
                />
              </div>
            ))}
          <div ref={chatBoxRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleMessage();
          }}
        >
          <div className="p-5 flex items-end gap-2 ">
            <TextareaAutosize
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              value={message}
              placeholder="在想甚麼?"
              className="w-full outline-none bg-slate-200 overflow-hidden resize-none py-[10px] px-[20px] rounded-[20px]"
            />
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mb-[10px] cursor-pointer "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
