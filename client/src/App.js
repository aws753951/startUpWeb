import React, { useState } from "react";
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

const App = () => {
  const [meet, setMeet] = useState(false);
  const [expandLeft, setExpandLeft] = useState(false);
  const [expandRight, setExpandRight] = useState(false);
  const [user, setUser] = useState("");
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
          {!expandRight && <Leftbar expandLeft={expandLeft} />}
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
          <Route index element={<Home setUser={setUser} />} />
          <Route path="search" element={<Search />} />
          <Route
            path="company"
            element={<CompanyInfo meet={meet} setMeet={setMeet} />}
          />
          <Route path="article" element={<Aritcle />} />
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
