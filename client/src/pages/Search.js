import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Company } from "../components/Company";

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const companyName = queryParams.get("companyName");

  const [company, setCompany] = useState([]);

  useEffect(() => {
    const getCompany = async () => {
      const companyList = await axios.get(
        process.env.REACT_APP_DB_URL + `/search/?companyName=${companyName}`
      );
      setCompany(companyList.data);
    };
    getCompany();
  }, [companyName]);

  return (
    <div className="col-span-5 md:col-span-3">
      <div className="flex flex-col md:mx-[10px] gap-[20px] mt-2">
        {company && company.map((data, i) => <Company data={data} key={i} />)}
      </div>
    </div>
  );
};

export default Search;
