import React from "react";
import Leftposts from "./Leftposts";

const Leftbar = ({ newest, hotest, expandLeft }) => {
  return (
    <div
      className={`${
        expandLeft ? "col-span-5" : "hidden scrollset"
      } xl:col-span-1 xl:block `}
    >
      <Leftposts newest={newest} hotest={hotest} />
    </div>
  );
};

export default Leftbar;
