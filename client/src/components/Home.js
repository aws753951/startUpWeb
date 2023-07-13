import React from "react";
import Posts from "./Posts";
import View from "./View";

const Home = () => {
  return (
    <div className="col-span-5 md:col-span-3">
      <View />
      <Posts />
    </div>
  );
};

export default Home;
