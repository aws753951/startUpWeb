import React from "react";
import Leftposts from "./Leftposts";

const Leftbar = () => {
  return (
    <div className="hidden xl:col-span-1 xl:block scrollset ">
      <Leftposts />
    </div>
  );
};

export default Leftbar;
