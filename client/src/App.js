import React, { useState, useEffect } from "react";
import "./output.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Nav from "./components/Nav";
import Leftbar from "./components/Leftbar";
import Rightbar from "./components/Rightbar";
import Temp from "./pages/Temp";
import Blank from "./pages/Blank";
import Search from "./pages/Search";
import CompanyInfo from "./pages/CompanyInfo";
import Home from "./pages/Home";
import Aritcle from "./pages/Aritcle";
import axios from "axios";
import { Helmet } from "react-helmet";
const App = () => {
  const [meet, setMeet] = useState(false);
  const [expandLeft, setExpandLeft] = useState(false);
  const [expandRight, setExpandRight] = useState(false);
  const [user, setUser] = useState("");

  const [newest, setNewest] = useState("");
  const [hotest, setHotest] = useState("");
  const [newestMeet, setNewestMeet] = useState("");

  // 取得特定公司的資訊
  const [details, setDetails] = useState({});
  const [companyId, setCompanyId] = useState("");

  // 給瀏覽器賦予使用者的ID
  useEffect(() => {
    const getUserId = async () => {
      let jwt_token = JSON.parse(localStorage.getItem("jwt_token"));
      try {
        if (jwt_token) {
          const object = await axios.get(
            process.env.REACT_APP_DB_URL + "/post",
            {
              headers: {
                Authorization: jwt_token,
              },
            }
          );
          const session_user_id = object.data.user_id;
          localStorage.setItem(
            "session_user_id",
            JSON.stringify(session_user_id)
          );
          setUser(session_user_id);
        }
      } catch (e) {
        console.log(e);
        if (e.response.data === "Unauthorized") {
          localStorage.removeItem("jwt_token");
          localStorage.removeItem("session_user_id");
        }
      }
    };

    getUserId();
  }, [setUser]);

  // 取得最新文章與熱門文章
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

    const getNewestMeet = async () => {
      let response = await axios.get(
        process.env.REACT_APP_DB_URL + "/search/newestMeet"
      );
      setNewestMeet(response.data);
    };
    getNewestMeet();
  }, []);

  useEffect(() => {
    const getSpecificCompany = async () => {
      const companyDetails = await axios.get(
        process.env.REACT_APP_DB_URL + `/search/?companyId=${companyId}`
      );
      setDetails(companyDetails.data);
    };

    if (companyId) {
      getSpecificCompany();
    }
  }, [companyId]);

  const Layout = ({ meet }) => {
    return (
      <div>
        <Nav
          user={user}
          expandLeft={expandLeft}
          setExpandLeft={setExpandLeft}
          expandRight={expandRight}
          setExpandRight={setExpandRight}
        />
        <div
          className={`grid grid-cols-5 ${
            meet ? "bg-purple-100" : "bg-blue-100"
          }`}
        >
          {!expandRight && (
            <Leftbar
              newest={newest}
              hotest={hotest}
              newestMeet={newestMeet}
              expandLeft={expandLeft}
            />
          )}
          {!expandRight && <Outlet />}
          <Rightbar user={user} expandRight={expandRight} />
        </div>
      </div>
    );
  };

  return (
    <div>
      <Helmet>
        <link rel="icon" href="../asset/hammer.png" />
        <meta name="robots" content="index" />
        <meta
          name="description"
          content="公開面試經驗，分享公司薪水，可交流無障礙找工作建議的平台"
        />
        <meta
          name="keywords"
          content="面試,薪水,工作,經驗,交流,免費,最佳,推薦,一定大拇指"
        />
      </Helmet>
      <BrowserRouter>
        <Routes>
          {/* 調整背景 */}
          <Route path="/" element={<Layout meet={meet} />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route
              path="company"
              element={
                <CompanyInfo
                  details={details}
                  setCompanyId={setCompanyId}
                  meet={meet}
                  setMeet={setMeet}
                />
              }
            />
            <Route
              path="article"
              element={<Aritcle meet={meet} setMeet={setMeet} />}
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/confirm/*" element={<Temp />} />
          <Route path="/auth/setjwt/*" element={<Blank />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
