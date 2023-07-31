import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";

const Temp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const [approve, setApprove] = useState(false);
  const [res, setRes] = useState(false);

  useEffect(() => {
    const register = async () => {
      try {
        await axios.get(
          `${process.env.REACT_APP_DB_URL}/auth/confirm/${token}`
        );
        setApprove(true);
        setRes(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (e) {
        // 若失敗則會維持在login的畫面
        setRes(true);
        console.log(e);
        setTimeout(() => {
          navigate("/register");
        }, 3000);
      }
    };
    register();
  }, [token, navigate]);

  return (
    <div>
      {res && (
        <div>
          {approve && (
            <div className="flex flex-col h-[200px] gap-[30px] justify-center items-center">
              <div className="text-[70px]">
                認證成功，網頁將於3秒內自動跳轉......
              </div>
              <div>
                <Link to="/login">
                  <button className=" p-[10px]  text-[30px] bg-blue-500 border-none font-bold cursor-pointer rounded-[10px] text-white">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          )}
          {!approve && (
            <div className="flex flex-col gap-[30px] justify-center items-center">
              <div className="text-[70px]">認證失敗</div>
              <div className="text-[30px]">
                請確認是否於註冊10分內進行網址認證，將於3秒內幫你跳轉至註冊頁面....
              </div>
              <div>
                <Link to="/register">
                  <button className=" p-[10px]  text-[30px] bg-blue-500 border-none font-bold cursor-pointer rounded-[10px] text-white">
                    Register
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Temp;
