import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const nagivate = useNavigate();
  // 待改
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const normalRegister = async () => {
    try {
      let response = await axios.post("http://localhost:8080/auth/register", {
        email,
        password,
      });
      nagivate("/login");
    } catch (e) {
      // 若失敗則會維持在login的畫面
      console.log(e);
    }
  };

  return (
    <div className=" login min-h-screen bg-purple-300 flex justify-center items-center ">
      <div className="my-5 xl:mt-0 card flex flex-col  xl:grid xl:grid-cols-2 bg-white w-5/6 xl:w-1/2 min-h-[600px]  rounded-lg overflow-hidden">
        <div className="left col-span-1  bg-blue-500  bg-opacity-80 p-[50px] flex flex-col gap-[30px] text-white">
          <h1 className="text-[100px] leading-[100px]">Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span className="text-[24px]">Don't you have an account?</span>
          <Link to="/login">
            <button className="w-[50%] p-[10px] bg-purple-200 border-none font-bold curser-pointer">
              Login
            </button>
          </Link>
        </div>
        <div className="right col-span-1 p-[50px] flex flex-col justify-center gap-[30px] ">
          <h1 className="text-[60px] ">Register</h1>
          <form className="flex flex-col gap-[30px]">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Email"
              className="border-b-4 p-1 outline-none"
            />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
              className="border-b-4 p-1 outline-none"
            />
            <div
              onClick={normalRegister}
              className="w-[50%] p-[10px] bg-purple-200 font-bold curser-pointer "
            >
              Register
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
