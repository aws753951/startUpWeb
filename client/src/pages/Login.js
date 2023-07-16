import React from "react";

const Login = () => {
  const googleAuth = () => {
    window.open(`http://localhost:8080/auth/google/callback`, "_self");
  };

  return (
    <div className=" login min-h-screen bg-purple-300 flex justify-center items-center ">
      <div className="my-5 xl:mt-0 card flex flex-col  xl:grid xl:grid-cols-2 bg-white w-5/6 xl:w-1/2 min-h-[600px]  rounded-lg overflow-hidden">
        <div className="left col-span-1  bg-blue-500  bg-opacity-80 p-[50px] flex flex-col justify-center gap-[30px] text-white">
          <h1 className="text-[30px] text-center">貼文，留言，聊天</h1>
          <h1 className="text-[50px] font-bold text-center">請先登入</h1>
        </div>
        <div className="right col-span-1 p-[50px] flex flex-col justify-center gap-[30px] ">
          <div onClick={googleAuth}>google</div>

          <div>github</div>
          {/* <h1 className="text-[60px] ">Login</h1>
          <form className="flex flex-col gap-[30px]">
            <input
              type="text"
              placeholder="Username"
              className=" border-b-4 p-1 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="border-b-4 p-1 outline-none"
            />
            <div
              onClick={googleAuth}
              className="w-[50%] p-[10px] text-center bg-purple-200 font-bold curser-pointer "
            >
              login
            </div>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
