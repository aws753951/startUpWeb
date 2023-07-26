import React from "react";

const Home = ({ expandLeft, setExpandLeft }) => {
  return (
    <div className="col-span-5 md:col-span-3 ">
      <div
        onClick={() => {
          setExpandLeft(!expandLeft);
        }}
        className=" border-dashed border-2 border-indigo-600"
      >
        123
      </div>
    </div>
  );
};

export default Home;
