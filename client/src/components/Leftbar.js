import React from "react";
import Leftposts from "./Leftposts";

const Leftbar = ({ expandLeft }) => {
  return (
    <div
      className={`${
        expandLeft ? "col-span-5" : "hidden scrollset"
      } xl:col-span-1 xl:block `}
    >
      <Leftposts />
    </div>
  );
};

export default Leftbar;
