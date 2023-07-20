import React, { useState } from "react";
import "./output.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Nav from "./components/Nav";
import Leftbar from "./components/Leftbar";
import Rightbar from "./components/Rightbar";
import Home from "./components/Home";
import Temp from "./pages/Temp";
import Blank from "./pages/Blank";

const App = () => {
  const Layout = ({ meet }) => {
    return (
      <div>
        <Nav />
        <div
          className={`grid grid-cols-5 ${
            meet ? "bg-purple-100" : "bg-blue-100"
          }`}
        >
          <Leftbar />
          <Outlet />
          <Rightbar />
        </div>
      </div>
    );
  };
  const [meet, setMeet] = useState(true);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout meet={meet} />}>
          <Route index element={<Home meet={meet} setMeet={setMeet} />} />
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
