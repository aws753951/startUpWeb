import React from "react";

const CompanyBuild = ({ write, setWrite }) => {
  return (
    <div className="shadow-lg rounded-[10px] bg-white cursor-pointer flex items-center">
      <div
        onClick={() => {
          setWrite(!write);
        }}
        className="p-[10px]  font-bold text-[24px]"
      >
        {!write ? "找不到公司? 自創一個吧?" : "返回搜尋公司頁"}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
        />
      </svg>
    </div>
  );
};

export default CompanyBuild;
