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

const App = () => {
  const [meet, setMeet] = useState(false);
  const [expandLeft, setExpandLeft] = useState(false);
  const [expandRight, setExpandRight] = useState(false);
  const [user, setUser] = useState("");

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

  let [newest, setNewest] = useState("");
  let [hotest, setHotest] = useState("");
  let [newestMeet, setNewestMeet] = useState("");

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

    // const getConceal = async () => {
    //   let response = await axios.get(
    //     process.env.REACT_APP_DB_URL + "/search/conceal"
    //   );
    //   setConceal(response.data);
    //   console.log(response.data);
    // };
    // getConceal();
  }, []);

  // 取得特定公司的資訊
  let [details, setDetails] = useState({});
  let [companyId, setCompanyId] = useState("");
  useEffect(() => {
    const getSpecificCompany = async () => {
      const companyDetails = await axios.get(
        process.env.REACT_APP_DB_URL + `/search/?companyId=${companyId}`
      );
      setDetails(companyDetails.data);
      console.log(companyDetails.data);
    };

    if (companyId) {
      console.log(companyId);
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
          <Rightbar expandRight={expandRight} />
        </div>
      </div>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* 調整背景 */}
        <Route path="/" element={<Layout meet={meet} />}>
          <Route
            index
            element={
              <Home
                expandLeft={expandLeft}
                setExpandLeft={setExpandLeft}
                setUser={setUser}
              />
            }
          />
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
  );
};

export default App;
