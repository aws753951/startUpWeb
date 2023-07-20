import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";

const Register = () => {
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
  const normalRegister = async (e) => {
    try {
      e.preventDefault();
      await axios.post(`${process.env.REACT_APP_DB_URL}/auth/register`, {
        email,
        password,
      });
      window.alert("請於10分鐘內至信箱認證");
      navigate("/login");
    } catch (e) {
      // 若失敗則會維持在login的畫面
      window.alert("信箱已被註冊，請用google或者換個email");
      console.log(e);
    }
  };

  return (
    <div className=" login min-h-screen bg-blue-500 flex justify-center items-center ">
      <div className="my-5 xl:mt-0 card flex flex-col xl:grid xl:grid-cols-2 bg-white w-5/6  min-h-[600px]  rounded-lg overflow-hidden">
        <div className="left col-span-1   bg-purple-300  bg-opacity-80 p-[50px] flex flex-col justify-center items-center gap-[30px] text-white">
          <h1 className="text-[60px] font-bold text-center text-black">註冊</h1>
          <span className="text-[24px] text-center text-black">
            若有帳號，請登入
          </span>
          <Link className="w-[60%]" to="/login">
            <button className=" p-[10px] w-full text-[24px] bg-blue-500 border-none font-bold cursor-pointer rounded-[10px] text-white">
              Login
            </button>
          </Link>
        </div>
        <div className="right col-span-1 p-[50px] flex flex-col justify-center gap-[40px] ">
          <h1 className="text-[60px]  ">Register</h1>
          <GoogleButton label="Google 登入" onClick={googleAuth} />
          <form onSubmit={normalRegister} className="flex flex-col gap-[30px]">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Email"
              className="border-b-4 p-1 text-[24px] outline-none"
            />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
              className="border-b-4 p-1 text-[24px] outline-none"
            />
            <button
              onClick={normalRegister}
              className="w-[60%] p-[10px] text-center text-[24px] bg-purple-200  font-bold cursor-pointer rounded-[10px] "
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
