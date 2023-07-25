import Post from "../components/Post";
import View from "../components/View";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const CompanyInfo = ({ meet, setMeet }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const companyId = queryParams.get("companyId");

  let [details, setDetails] = useState({});

  useEffect(() => {
    const getSpecificCompany = async () => {
      const companyDetails = await axios.get(
        process.env.REACT_APP_DB_URL + `/search/?companyId=${companyId}`
      );
      setDetails(companyDetails.data);
      console.log(companyDetails.data);
    };
    getSpecificCompany();
  }, [companyId]);

  const [write, setWrite] = useState(false);
  return (
    <div className="col-span-5 md:col-span-3">
      {details && (
        <View
          // 提供給寫工作經驗時作為req.body包著的東西
          companyId={companyId}
          evaluation={details.evaluation}
          wageandseniority={details.wageandseniority}
          companyName={details.name}
          meet={meet}
          setMeet={setMeet}
          write={write}
          setWrite={setWrite}
        />
      )}
      <div className="flex flex-col md:mx-[10px] gap-[10px] mt-2">
        {!meet &&
          !write &&
          details &&
          details.jobposts &&
          details.jobposts.map((data, i) => <Post data={data} key={i} />)}
        {meet &&
          !write &&
          details &&
          details.meetposts &&
          details.meetposts.map((data, i) => <Post data={data} key={i} />)}
      </div>
    </div>
  );
};

export default CompanyInfo;
