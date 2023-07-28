import React from "react";
import Chat from "./Chat";

const Rightbar = ({ user, expandRight, chatmsg, setChatmsg }) => {
  return (
    <div
      className={`${
        expandRight
          ? "col-span-5"
          : "hidden scrollset md:col-span-2 xl:col-span-1 md:block"
      } `}
    >
      <Chat user={user} chatmsg={chatmsg} setChatmsg={setChatmsg} />
    </div>
  );
};

export default Rightbar;
