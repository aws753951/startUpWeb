import React from "react";
import { Link } from "react-router-dom";

export const Company = ({ data }) => {
  const { _id, name, url, jobposts, meetposts } = data;

  return (
    <div className="shadow-lg rounded-[10px] bg-white ">
      <Link to={`/company/?companyId=${_id}`}>
        <div className="p-[10px] gap-[10px] flex flex-col flex-wrap overflow-hidden">
          <div className="font-bold border-b-4 text-[24px]">{name}</div>
          <div className="flex gap-[30px] text-[20px]">
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(url, "_blank");
              }}
            >
              <div className="text-black bg-orange-300 p-1 rounded-[10px]">
                104連結
              </div>
            </div>

            <div className="text-black bg-blue-300 p-1 rounded-[10px]">
              {jobposts.length} 則工作甘苦
            </div>
            <div className="text-black bg-purple-300 p-1 rounded-[10px]">
              {meetposts.length} 則面試經驗
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
