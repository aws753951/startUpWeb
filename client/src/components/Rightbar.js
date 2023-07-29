import React from "react";
import Chat from "./Chat";

const Rightbar = ({ user, expandRight }) => {
  return (
    <div
      className={`${
        expandRight
          ? "col-span-5"
          : "hidden overflow-scroll scrollset md:col-span-2 xl:col-span-1 md:block"
      } `}
    >
      <Chat user={user} />
    </div>
  );
};

export default Rightbar;
