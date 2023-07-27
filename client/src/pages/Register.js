import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = useCallback(() => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      setError("請輸入正確的email格式");
    } else {
      setError("");
    }
  }, [email]);

  const valiidatePassword = useCallback(() => {
    if (password.length < 6 || password.length > 100) {
      setPasswordError("請密碼長度介於6~100字");
    } else {
      setPasswordError("");
    }
  }, [password]);

  useEffect(() => {
    validateEmail();
    valiidatePassword();
  }, [email, validateEmail, valiidatePassword]);

  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_DB_URL}/auth/google/callback`,
      "_self"
    );
  };
  const normalRegister = async (e) => {
    try {
      if (!error && !passwordError) {
        setIsSubmitted(true);
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_DB_URL}/auth/register`, {
          email,
          password,
        });
        window.alert("請於10分鐘內至信箱認證");
        navigate("/login");
        // 這幾個應該用不到，前面html的格式就幫忙擋了
      } else if (error) {
        window.alert(error);
        setIsSubmitted(false);
        // 這幾個應該用不到，前面html的格式就幫忙擋了
      } else if (passwordError) {
        window.alert(passwordError);
        setIsSubmitted(false);
      }
    } catch (e) {
      // 若失敗則會維持在login的畫面
      window.alert("信箱已被註冊，請用google或者換個email");
      console.log(e);
      setIsSubmitted(false);
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
              className={`border-b-4 p-1 text-[24px] outline-none ${
                error ? "border-gray-300" : "border-green-500"
              }`}
              min={6}
              max={50}
              required
            />

            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
              className={`border-b-4 p-1 text-[24px] outline-none ${
                passwordError ? "border-gray-300" : "border-green-500"
              }`}
              minLength={6}
              maxLength={100}
              required
            />
            <button
              disabled={isSubmitted}
              className="w-[60%] p-[10px] text-center text-[24px] bg-purple-200  font-bold cursor-pointer rounded-[10px] "
            >
              {isSubmitted ? "提交中" : "註冊"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
