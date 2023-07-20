import Posts from "./Posts";
import View from "./View";
import React, { useState } from "react";

const Home = ({ meet, setMeet }) => {
  const [write, setWrite] = useState(false);

  return (
    <div className="col-span-5 md:col-span-3">
      <View meet={meet} setMeet={setMeet} write={write} setWrite={setWrite} />
      <Posts write={write} />
    </div>
  );
};

export default Home;
