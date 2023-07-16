import React, { useEffect, useState } from "react";
import "./output.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Leftbar from "./components/Leftbar";
import Rightbar from "./components/Rightbar";
import Home from "./components/Home";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      let res = await axios.get("http://localhost:8080/auth/login/success", {
        withCredentials: true,

        // res.json格式要加這些
        // headers: {
        //   Accept: "application/json",
        //   "Content-Type": "application/json",
        // },
      });
      setUser(res.data);
    };
    getUser();
  }, []);

  const Layout = () => {
    return (
      <div>
        <Nav />
        <div className="grid grid-cols-5 bg-gray-200">
          <Leftbar />
          <Outlet />
          <Rightbar user={user} />
        </div>
      </div>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
