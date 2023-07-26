import React from "react";
import Leftposts from "./Leftposts";

const Leftbar = ({ newestMeet, newest, hotest, expandLeft }) => {
  return (
    <div
      className={`${
        expandLeft ? "col-span-5" : "hidden scrollset"
      } xl:col-span-1 xl:block `}
    >
      <Leftposts newest={newest} newestMeet={newestMeet} hotest={hotest} />
    </div>
  );
};

export default Leftbar;
