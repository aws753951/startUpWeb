import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SmallPost from "./SmallPost";
import axios from "axios";

const Leftposts = () => {
  let [newest, setNewest] = useState("");
  let [hotest, setHotest] = useState("");

  useEffect(() => {
    const getNewest = async () => {
      let response = await axios.get(
        process.env.REACT_APP_DB_URL + "/search/newest"
      );
      setNewest(response.data);
    };
    getNewest();

    const getHotest = async () => {
      let response = await axios.get(
        process.env.REACT_APP_DB_URL + "/search/hotest"
      );
      setHotest(response.data);
    };
    getHotest();

    // const getConceal = async () => {
    //   let response = await axios.get(
    //     process.env.REACT_APP_DB_URL + "/search/conceal"
    //   );
    //   setConceal(response.data);
    //   console.log(response.data);
    // };
    // getConceal();
  }, []);
  return (
    <div className="pl-2 mt-2">
      <div className="max-h-[500px] shadow-lg rounded-[10px]  bg-gray-50 overflow-scroll no-scrollbar relative">
        <div className=" bg-orange-400 font-bold text-[24px] text-center sticky z-10 top-0 border-b-4">
          最新文章
        </div>
        <div className="flex flex-col divide-y-4 divide-slate-400/25">
          {newest &&
            newest.map((e, i) => (
              <Link to={`/article/?article_id=${e._id}`} key={i}>
                <SmallPost companyName={e.companyName} oneword={e.oneword} />
              </Link>
            ))}
        </div>
      </div>
      <div className="mt-2 max-h-[500px] shadow-lg rounded-[10px]  bg-gray-50 overflow-scroll no-scrollbar relative">
        <div className=" bg-red-700 font-bold text-[24px] text-center sticky z-10 top-0 border-b-4">
          熱門文章
        </div>
        <div className="flex flex-col divide-y-4 divide-slate-400/25">
          {hotest &&
            hotest.map((e, i) => (
              <Link to={`/article/?article_id=${e._id}`} key={i}>
                <SmallPost companyName={e.companyName} oneword={e.oneword} />
              </Link>
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
