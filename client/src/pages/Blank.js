import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// 處理googlelogin
const Blank = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    localStorage.setItem("jwt_token", JSON.stringify(token));
    navigate("/");
  }, [navigate, token]);

  return <div></div>;
};

export default Blank;
