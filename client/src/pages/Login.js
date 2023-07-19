import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import GoogleButton from "react-google-button";

const Login = () => {
  const navigate = useNavigate();
  // 待改
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_DB_URL}/auth/google/callback`,
      "_self"
    );
  };

  const normalLogin = async () => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_DB_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("jwt_token", JSON.stringify(response.data));
      navigate("/");
    } catch (e) {
      // 若失敗則會維持在login的畫面
      window.alert("帳號或密碼錯誤");
    }
  };

  return (
    <div className=" login min-h-screen bg-purple-300 flex justify-center items-center ">
      <div className="my-5 xl:mt-0 card flex flex-col  xl:grid xl:grid-cols-2 bg-white w-5/6 min-h-[600px]  rounded-lg overflow-hidden">
        <div className="left col-span-1  bg-blue-500  bg-opacity-80 p-[50px] flex flex-col justify-center gap-[30px] text-white">
          <h1 className="text-[30px] text-center">貼文，留言，聊天</h1>
          <h1 className="text-[60px] font-bold text-center">請先登入</h1>
          <span className="text-[24px] text-center">沒有帳號，請註冊</span>
          <Link to="/register">
            <button className="w-[50%] p-[10px] bg-purple-200 border-none font-bold cursor-pointer rounded-[10px] text-black">
              Register
            </button>
          </Link>
        </div>
        <div className="right col-span-1 p-[50px] flex flex-col justify-center gap-[30px] ">
          <GoogleButton label="Google 登入" onClick={googleAuth} />
          <h1 className="text-[60px] ">Login</h1>
          <form className="flex flex-col gap-[30px]">
            <input
              type="text"
              placeholder="Email"
              className=" border-b-4 p-1 outline-none"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="border-b-4 p-1 outline-none"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div
              onClick={normalLogin}
              className="w-[50%] p-[10px] text-center bg-blue-200 font-bold cursor-pointer rounded-[10px] "
            >
              login
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
