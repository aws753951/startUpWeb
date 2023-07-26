import React from "react";

const SmallPost = ({ companyName, oneword }) => {
  return (
    <div className="flex flex-col bg-white hover:bg-green-50">
      <div className="text-center text-[12px] font-bold border-b-2 text-gray-400">
        {companyName}
      </div>
      <div className="text-center break-words">{oneword}</div>
    </div>
  );
};

export default SmallPost;
