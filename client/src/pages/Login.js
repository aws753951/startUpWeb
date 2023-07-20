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

  const normalLogin = async (e) => {
    try {
      e.preventDefault();
      console.log(e.target.value);
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
        <div className="left col-span-1  bg-blue-500  bg-opacity-80 p-[50px] flex flex-col justify-center items-center gap-[30px] text-white">
          <h1 className="text-[30px] text-center">網頁互動</h1>
          <h1 className="text-[60px] font-bold text-center">請先登入</h1>
          <span className="text-[24px] text-center">沒有帳號，請註冊</span>
          <Link to="/register" className="w-[60%]">
            <button className="w-full p-[10px] text-[24px] bg-purple-200 border-none font-bold cursor-pointer rounded-[10px] text-black">
              Register
            </button>
          </Link>
        </div>
        <div className="right col-span-1 p-[50px] flex flex-col justify-center gap-[40px] ">
          <h1 className="text-[60px] ">Login</h1>
          <GoogleButton label="Google 登入" onClick={googleAuth} />
          <form onSubmit={normalLogin} className="flex flex-col gap-[30px]">
            <input
              type="text"
              placeholder="Email"
              className=" border-b-4 p-1 text-[24px] outline-none"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="border-b-4 p-1  text-[24px] outline-none"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              onClick={normalLogin}
              className="w-[60%] p-[10px] text-[24px] text-center bg-blue-200 font-bold cursor-pointer rounded-[10px] "
            >
              login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
