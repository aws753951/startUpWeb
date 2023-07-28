import React from "react";
const moment = require("moment-timezone");

const Message = ({ msg, own }) => {
  return (
    <div className={`flex  ${own ? "justify-end" : "justify-start"} `}>
      <div className="flex gap-[5px]">
        <img
          src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          className={`w-[50px] h-[50px] rounded-full object-cover ${
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
              className={`p-[10px]  rounded-[20px]  ${
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
