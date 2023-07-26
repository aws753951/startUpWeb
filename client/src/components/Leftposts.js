import React from "react";
import SmallPost from "./SmallPost";

const Leftposts = ({ newestMeet, newest, hotest }) => {
  return (
    <div className="pl-2 mt-2 ">
      <div className=" mb-2 max-h-[500px] shadow-lg rounded-[10px]  bg-gray-50 overflow-scroll no-scrollbar relative">
        <div className=" bg-purple-300 font-bold text-[24px] text-center sticky z-10 top-0 border-b-4">
          最新面試文章
        </div>
        <div className="flex flex-col divide-y-4 divide-slate-400/25">
          {newestMeet &&
            newestMeet.map((e, i) => (
              <a href={`/article/?meetArticle_id=${e._id}`} key={i}>
                <SmallPost companyName={e.companyName} oneword={e.oneword} />
              </a>
            ))}
        </div>
      </div>
      <div className="mb-2 max-h-[500px] shadow-lg rounded-[10px]  bg-gray-50 overflow-scroll no-scrollbar relative">
        <div className=" bg-blue-300 font-bold text-[24px] text-center sticky z-10 top-0 border-b-4">
          最新工作文章
        </div>
        <div className="flex flex-col divide-y-4 divide-slate-400/25">
          {newest &&
            newest.map((e, i) => (
              <a href={`/article/?article_id=${e._id}`} key={i}>
                <SmallPost companyName={e.companyName} oneword={e.oneword} />
              </a>
            ))}
        </div>
      </div>
      <div className="mb-2 max-h-[500px] shadow-lg rounded-[10px]  bg-gray-50 overflow-scroll no-scrollbar relative">
        <div className=" bg-red-300 font-bold text-[24px] text-center sticky z-10 top-0 border-b-4">
          熱門工作文章
        </div>
        <div className="flex flex-col divide-y-4 divide-slate-400/25">
          {hotest &&
            hotest.map((e, i) => (
              <a href={`/article/?article_id=${e._id}`} key={i}>
                <SmallPost companyName={e.companyName} oneword={e.oneword} />
              </a>
            ))}
        </div>
      </div>
      {/* <div className="mt-2 max-h-[500px] shadow-lg rounded-[10px]  bg-gray-50 overflow-scroll no-scrollbar relative">
        <div className=" bg-gray-400 font-bold text-[24px] text-center sticky z-10 top-0 border-b-4">
          待屏蔽文章
        </div>
        <div className="flex flex-col divide-y-4 divide-slate-400/25">
          {conceal &&
            conceal.map((e, i) => (
              <Link to={`/article/?article_id=${e._id}`} key={i}>
                <SmallPost companyName={e.companyName} oneword={e.oneword} />
              </Link>
            ))}
        </div>
      </div> */}
    </div>
  );
};

export default Leftposts;
