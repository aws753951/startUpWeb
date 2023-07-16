import React, { useEffect } from "react";
import Chat from "./Chat";
import { useLocation } from "react-router-dom";

const Rightbar = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("jwt_token", JSON.stringify(token));
    }
  }, [token]);
  return (
    <div className="hidden mt-2 md:col-span-2 xl:col-span-1 md:block scrollset">
      <Chat />
    </div>
  );
};

export default Rightbar;
