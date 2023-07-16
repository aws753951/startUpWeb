import React from "react";
import "./output.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Leftbar from "./components/Leftbar";
import Rightbar from "./components/Rightbar";
import Home from "./components/Home";

const App = () => {
  const Layout = () => {
    return (
      <div>
        <Nav />
        <div className="grid grid-cols-5 bg-gray-200">
          <Leftbar />
          <Outlet />
          <Rightbar />
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
