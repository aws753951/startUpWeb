import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Company } from "../components/Company";
import CompanyBuild from "../components/CompanyBuild";
import CompanyPost from "../components/CompanyPost";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const companyName = queryParams.get("companyName");

  const [company, setCompany] = useState([]);
  const [write, setWrite] = useState(false);

  useEffect(() => {
    const getCompany = async () => {
      const companyList = await axios.get(
        process.env.REACT_APP_DB_URL + `/search/?companyName=${companyName}`
      );
      setCompany(companyList.data);
    };
    getCompany();
  }, [companyName]);

  const handlePost = async () => {
    let jwt_token = JSON.parse(localStorage.getItem("jwt_token"));
    if (!jwt_token) {
      localStorage.removeItem("session_user_id");
      window.alert("要新增公司，請先登入");
      navigate("/login");
    } else {
      try {
        await axios.get(`${process.env.REACT_APP_DB_URL}/post`, {
          headers: {
            Authorization: jwt_token,
          },
        });
        setWrite(!write);
      } catch (e) {
        console.log(e);
        window.alert("session過期，請重新登入");
        navigate("/login");
      }
    }
  };

  return (
    <div className="col-span-5 md:col-span-3">
      <div className="flex flex-col md:mx-[10px] gap-[10px] mt-2">
        {!write &&
          company &&
          company.map((data, i) => <Company data={data} key={i} />)}
        <div onClick={handlePost}>
          <CompanyBuild write={write} setWrite={setWrite} />
        </div>

        {write && <CompanyPost />}
      </div>
    </div>
  );
};

export default Search;
