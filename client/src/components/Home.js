import React from "react";
import Posts from "./Posts";
import View from "./View";

const Home = ({ meet, setMeet }) => {
  return (
    <div className="col-span-5 md:col-span-3">
      <View meet={meet} setMeet={setMeet} />
      <Posts />
    </div>
  );
};

export default Home;
