import React from "react";
const moment = require("moment-timezone");

const Message = ({ msg, own }) => {
  return (
    <div className={`flex  ${own ? "justify-end" : "justify-start"} `}>
      <div className="flex gap-[5px]">
        <img
          src={require("../assets/photo.png")}
          alt=""
          className={`w-[40px] h-[40px] rounded-full object-cover ${
            own ? "hidden" : "block"
          }`}
        />
        <div className="flex flex-col">
          <div className={`flex gap-5 ${own ? "hidden" : "block"}`}>
            <p className="text-[14px]">
              {/* 因應使用者可能被刪除，但仍然存在於資料庫中的紀錄 */}
              {msg.user_id ? msg.user_id.username : "Anonymous"}
            </p>
          </div>
          <p
            className={`text-[14px] text-end ${own ? "block" : "hidden"} `}
          ></p>
          <div
            className={`flex w-full  relative group gap-[5px]  hover:messageTime:block ${
              own ? "justify-end" : "justify-start"
            }`}
          >
            <pre
              className={`px-[7px] py-[2px] rounded-[10px]  ${
                own ? "bg-green-300 text-end my-[10px]" : "bg-white"
              } break-all `}
            >
              {msg.message}
            </pre>
            <p
              className={`absolute bottom-[-20px] ${
                !own ? "left-0" : "right-0"
              } min-w-[170px]  bg-slate-500 p-[4px] rounded-[10px] text-white hidden group-hover:block`}
            >
              {moment(msg.createdAt)
                .tz("Asia/Taipei")
                .format("YYYY-MM-DD HH:mm:ss")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
