import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Nav = ({
  user,
  expandLeft,
  setExpandLeft,
  expandRight,
  setExpandRight,
}) => {
  const navigate = useNavigate();
  let [companyName, setCompanyName] = useState("");

  const handleSearch = () => {
    if (companyName) {
      navigate(`/search/?companyName=${companyName}`);
      setCompanyName("");
    }
  };

  const handleLogin = () => {
    if (user) {
      window.alert("幫你登出了");
      localStorage.removeItem("jwt_token");
      localStorage.removeItem("session_user_id");
      navigate("/");
      window.location.reload();
    } else {
      window.alert("幫你導向登入頁面");
      navigate("/login");
    }
  };

  return (
    <div className="shadow-sm grid grid-cols-2 md:grid-cols-3 items-center sticky z-20 bg-white top-0 border-b-2 h-[90px] w-full">
      <div className="flex items-center  col-span-1">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="ml-5 cursor-pointer"
        >
          <span className="md:text-4xl font-bold">也援薪自助</span>
        </div>

        {/* 漢堡 */}
        <div
          onClick={() => {
            setExpandLeft(!expandLeft);
          }}
          className="px-4 cursor-pointer xl:hidden"
          id="burger"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>

      <div className="hidden md:block md:col-span-1">
        <div className="searchBar flex items-center w-full h-[66px] rounded-full bg-slate-200 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-[48px] h-[48px] mx-5 text-3xl"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>

          <input
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
            value={companyName}
            placeholder="搜尋公司..."
            className="searchInput border-none outline-none w-5/6  bg-slate-200 text-[36px] "
          />

          <svg
            onClick={handleSearch}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-[48px] h-[48px] mx-5 text-3xl cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </div>
      </div>

      <div className="col-span-1 ">
        <div className=" flex items-center justify-end ">
          <div
            onClick={() => {
              setExpandRight(!expandRight);
            }}
            className="mx-2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 001.28.53l4.184-4.183a.39.39 0 01.266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0012 2.25zM8.25 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm2.625 1.125a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div
            onClick={handleLogin}
            className="overflow-hidden mr-5 cursor-pointer"
          >
            {user && (
              <img
                alt="已登入"
                src={require("../assets/photo.png")}
                className="w-10 h-10 object-cover rounded-full"
              />
            )}
            {!user && (
              <img
                alt="未登入"
                src={require("../assets/noAvatar.png")}
                className="w-10 h-10 object-cover rounded-full"
              />
            )}
          </div>
        </div>
      </div>
      <div className="col-span-2 mx-5 md:hidden">
        <div className="searchBar flex items-center w-full h-[36px] rounded-full bg-slate-200 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-[24px] h-[24px] mx-5 text-[24px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>

          <input
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
            value={companyName}
            placeholder="搜尋公司..."
            className="searchInput border-none outline-none w-5/6  bg-slate-200 text-[24px] "
          />

          <svg
            onClick={handleSearch}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-[24px] h-[24px] mx-5 text-[24px] cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Nav;
