import React from "react";
import Chat from "./Chat";

const Rightbar = ({ user }) => {
  return (
    <div className="hidden mt-2 md:col-span-2 xl:col-span-1 md:block scrollset">
      <Chat user={user} />
    </div>
  );
};

export default Rightbar;
