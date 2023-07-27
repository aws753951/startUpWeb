import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JobPost = ({ companyId, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  let [jobname, setJobname] = useState("");
  let [level, setLevel] = useState("");
  let [seniority, setSeniority] = useState("");
  let [curseniority, setCurseniority] = useState("");
  let [monthwage, setMonthwage] = useState("");
  let [yearwage, setYearwage] = useState("");
  let [workhour, setWorkhour] = useState("");
  let [addworkhour, setAddworkhour] = useState("");
  let [easy, setEasy] = useState("");
  let [loading, setLoading] = useState("");
  let [environ, setEnviron] = useState("");
  let [satisfaction, setSatisfaction] = useState("");
  let [experience, setExperience] = useState("");
  let [oneword, setOneword] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = async () => {
    let jwt_token = JSON.parse(localStorage.getItem("jwt_token"));
    if (!jwt_token) {
      window.alert("要Po文，請先登入");
      navigate("/login");
      return;
    }
    try {
      setIsSubmitted(true);
      await axios.post(
        process.env.REACT_APP_DB_URL + "/post/article/post",
        {
          companyId,
          jobname,
          level,
          seniority,
          curseniority,
          monthwage,
          yearwage,
          workhour,
          addworkhour,
          easy,
          loading,
          environ,
          satisfaction,
          experience,
          oneword,
        },
        {
          headers: {
            Authorization: jwt_token,
          },
        }
      );
      window.alert("已經發文成功，幫你導回公司頁面");
      navigate(0);
    } catch (e) {
      console.log(e);
      if (e.response.data === "Unauthorized") {
        window.alert("session錯誤，請你重新登入");
        navigate("/login");
        return;
      }
      window.alert(e.response.data);
      setIsSubmitted(false);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        <div className="bg-white gap-[20px] flex flex-col  rounded-[10px] p-5 mt-2 ">
          <div className="text-[30px] font-bold text-center">工作評論</div>
          <div className="flex items-center justify-between gap-[10px]">
            <span className="font-bold ">職位名稱:</span>
            <div className="flex-grow">
              <input
                onChange={(e) => {
                  setJobname(e.target.value);
                }}
                placeholder="後端工程師 等"
                className="w-full outline-none p-2  bg-slate-100"
                minLength={1}
                maxLength={50}
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-[10px]">
            <span className="font-bold ">職務等級:</span>
            <div className="flex-grow">
              <input
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
                placeholder="Junior / IC2 等"
                className="w-full outline-none p-2  bg-slate-100"
                minLength={1}
                maxLength={50}
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-[10px]">
            <span className="font-bold ">相關年資:</span>
            <div className="flex-grow">
              <input
                onChange={(e) => {
                  setSeniority(e.target.value);
                }}
                placeholder="0~20 年"
                type="number"
                min={0}
                max={20}
                step="0.5"
                className="appearance-none w-full outline-none p-2  bg-slate-100"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-[10px]">
            <span className="font-bold ">現職年資:</span>
            <div className="flex-grow">
              <input
                onChange={(e) => {
                  setCurseniority(e.target.value);
                }}
                placeholder="0~20 年"
                type="number"
                min={0}
                max={20}
                step="0.5"
                className="appearance-none w-full outline-none p-2  bg-slate-100"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-[10px]">
            <span className="font-bold ">月薪(萬):</span>
            <div className="flex-grow">
              <input
                onChange={(e) => {
                  setMonthwage(e.target.value);
                }}
                placeholder="台幣計價，美金1:30"
                type="number"
                min={2.6}
                max={100}
                step="0.1"
                className="appearance-none w-full outline-none p-2  bg-slate-100"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-[10px]">
            <span className="font-bold ">年薪(萬):</span>
            <div className="flex-grow">
              <input
                onChange={(e) => {
                  setYearwage(e.target.value);
                }}
                placeholder="(算整包)，台幣計價"
                type="number"
                min={30}
                max={2000}
                step="1"
                className="appearance-none w-full outline-none p-2  bg-slate-100"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-[10px]">
            <span className="font-bold ">每日工時:</span>
            <div className="flex-grow">
              <input
                onChange={(e) => {
                  setWorkhour(e.target.value);
                }}
                placeholder="(平均)小時"
                type="number"
                min={4}
                max={24}
                step="0.1"
                className="appearance-none w-full outline-none p-2  bg-slate-100"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-[10px]">
            <span className="font-bold ">每月加班工時:</span>
            <div className="flex-grow">
              <input
                onChange={(e) => {
                  setAddworkhour(e.target.value);
                }}
                placeholder="(總計)小時"
                type="number"
                min={0}
                max={20}
                step="0.1"
                className="appearance-none w-full outline-none p-2  bg-slate-100"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-[10px]">
            <span className="font-bold ">輕鬆程度:</span>
            <div className="flex-grow">
              <input
                onChange={(e) => {
                  setEasy(e.target.value);
                }}
                placeholder="1~5，撇除自身能力"
                type="number"
                min={1}
                max={5}
                step="0.1"
                className="appearance-none w-full outline-none p-2  bg-slate-100"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-[10px]">
            <span className="font-bold ">Loading程度:</span>
            <div className="flex-grow">
              <input
                onChange={(e) => {
                  setLoading(e.target.value);
                }}
                placeholder="1~5，越不合理越高"
                type="number"
                min={1}
                max={5}
                step="0.1"
                className="appearance-none w-full outline-none p-2  bg-slate-100"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-[10px]">
            <span className="font-bold ">企業氛圍:</span>
            <div className="flex-grow">
              <input
                onChange={(e) => {
                  setEnviron(e.target.value);
                }}
                placeholder="1~5，主管態度好，公司福利等"
                type="number"
                min={1}
                max={5}
                step="0.1"
                className="appearance-none w-full outline-none p-2  bg-slate-100"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-[10px]">
            <span className="font-bold ">整體滿意度:</span>
            <div className="flex-grow">
              <input
                onChange={(e) => {
                  setSatisfaction(e.target.value);
                }}
                placeholder="1~5，你推不推薦?"
                type="number"
                min={1}
                max={5}
                step="0.1"
                className="appearance-none w-full outline-none p-2  bg-slate-100"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-[10px]">
            <span className="font-bold ">工作心得:</span>
            <div className="flex-grow">
              <TextareaAutosize
                onChange={(e) => {
                  setExperience(e.target.value);
                }}
                placeholder="請誠實分享，誤加水造謠等，最多1萬字"
                minLength={1}
                maxLength={10000}
                className="min-h-[300px] w-full  outline-none bg-slate-100 overflow-hidden resize-none p-2 "
                required
              ></TextareaAutosize>
            </div>
          </div>
          <div className="flex items-center justify-center gap-[10px]">
            <span className="font-bold ">一句話說明此公司:</span>
            <div className="flex-grow">
              <input
                onChange={(e) => {
                  setOneword(e.target.value);
                }}
                placeholder="50字內"
                className="w-full outline-none p-2  bg-slate-100"
                maxLength={50}
                minLength={1}
                required
              />
            </div>
          </div>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="py-2 px-[100px] bg-blue-300 rounded-[10px] text-[24px] font-bold"
            >
              提交
            </button>
          </div>
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
                    即將提交評論
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      你的內容提交後就不可更改了，需要再多看幾眼嗎?
                    </p>
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
                      onClick={handleSubmit}
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
    </>
  );
};

export default JobPost;
