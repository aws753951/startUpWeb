import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CompanyPost = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCompanySubmit = async () => {
    let jwt_token = JSON.parse(localStorage.getItem("jwt_token"));
    if (!jwt_token) {
      window.alert("要Po文，請先登入");
      navigate("/login");
      return;
    }
    try {
      setIsSubmitted(true);
      await axios.post(
        process.env.REACT_APP_DB_URL + "/post/company",
        {
          // 避免有人從postman惡搞
          name:
            companyName.split("LOGO").length === 2
              ? companyName.split("LOGO")[1].trim()
              : companyName.trim(),
          url: companyUrl,
        },
        {
          headers: {
            Authorization: jwt_token,
          },
        }
      );
      window.alert("已經新增成功，幫你導回公司頁面");
      navigate(0);
    } catch (e) {
      console.log(e);
      if (e.response.data === "Unauthorized") {
        window.alert("session錯誤，請你重新登入");
        navigate("/login");
        return;
      }
      setIsSubmitted(false);
      window.alert(e.response.data);
    }
  };

  return (
    <div className="shadow-lg rounded-[10px] bg-white  flex flex-col p-[10px] ">
      <div className="  font-bold text-[24px] text-center ">創建新公司</div>
      <span className="text-center">
        請於104直接複製公司名稱與該公司在104的網址
      </span>

      <img
        alt="範例"
        className="border-4 border-red-600 p-1"
        src={require("../assets/companyname.png")}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        <div className="flex items-center justify-between gap-[10px] mt-2">
          <span className="font-bold text-[16px]">公司名:</span>
          <div className="flex-grow">
            <input
              minLength={1}
              maxLength={100}
              onChange={(e) => {
                setCompanyName(
                  e.target.value.split("LOGO").length === 2
                    ? e.target.value.split("LOGO")[1].trim()
                    : e.target.value.trim()
                );
              }}
              placeholder="填寫104上公司的全名"
              className="w-full outline-none p-2  bg-slate-100"
              required
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-[10px]  mt-2">
          <span className="font-bold text-[16px]">公司104網址:</span>
          <div className="flex-grow">
            <input
              minLength={1}
              maxLength={200}
              onChange={(e) => {
                setCompanyUrl(e.target.value);
              }}
              placeholder="https://www.104.com.tw/company/xxx"
              pattern="^https:\/\/www\.104\.com\.tw\/company.*$"
              className="w-full outline-none p-2  bg-slate-100"
              required
            />
          </div>
        </div>
        <div className="flex justify-center items-center mt-2">
          <button
            type="submit"
            className="py-2 px-[100px] bg-gray-300 rounded-[10px] text-[24px] font-bold"
          >
            提交
          </button>
        </div>
      </form>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg  font-bold leading-6 text-gray-900"
                  >
                    即將提交公司資訊
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      公司名稱: {companyName}
                    </p>
                    <div className="flex">
                      <p className="text-sm min-w-[60px] text-gray-500">
                        104網址:
                      </p>
                      <p
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(companyUrl, "_blank");
                        }}
                        className="text-sm cursor-pointer text-gray-500 hover:text-blue-700"
                      >
                        {companyUrl}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-200 px-4 py-2 text-sm font-medium text-black hover:bg-green-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    >
                      回頭是岸
                    </button>
                    <button
                      onClick={handleCompanySubmit}
                      type="button"
                      disabled={isSubmitted}
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-black hover:bg-red-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      {isSubmitted ? "提交中" : "無情提交"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CompanyPost;
