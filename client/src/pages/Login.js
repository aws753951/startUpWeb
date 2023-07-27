import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import GoogleButton from "react-google-button";

const Login = () => {
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

  const normalLogin = async (e) => {
    try {
      if (!error && !passwordError) {
        setIsSubmitted(true);
        e.preventDefault();
        let response = await axios.post(
          `${process.env.REACT_APP_DB_URL}/auth/login`,
          {
            email,
            password,
          }
        );
        localStorage.setItem("jwt_token", JSON.stringify(response.data));
        navigate("/");
        window.location.reload();
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
      console.log(e);
      // 若失敗則會維持在login的畫面
      window.alert("帳號或密碼錯誤");
      setIsSubmitted(false);
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
              type="email"
              placeholder="Email"
              className={`border-b-4 p-1 text-[24px] outline-none ${
                error ? "border-gray-300" : "border-green-500"
              }`}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              minLength={6}
              maxLength={50}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className={`border-b-4 p-1 text-[24px] outline-none ${
                passwordError ? "border-gray-300" : "border-green-500"
              }`}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              minLength={6}
              maxLength={100}
              required
            />
            <button
              disabled={isSubmitted}
              className="w-[60%] p-[10px] text-[24px] text-center bg-blue-200 font-bold cursor-pointer rounded-[10px] "
            >
              {isSubmitted ? "提交中" : "登入"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
