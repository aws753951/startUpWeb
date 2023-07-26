import { React } from "react";

const ViewSmall = ({ meet, companyName }) => {
  return (
    <div className="md:mx-[10px]  mt-2">
      <div className="bg-white  rounded-[10px] p-5 mt-2 ">
        <div
          className={`text-center font-bold text-[20px] p-2 ${
            !meet ? "bg-blue-200" : "bg-purple-200"
          } `}
        >
          {companyName ? companyName : "某某公司"}
        </div>
      </div>
    </div>
  );
};

export default ViewSmall;
