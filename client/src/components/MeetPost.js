import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MeetPost = ({ companyId, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  let [jobname, setJobname] = useState("");
  let [seniority, setSeniority] = useState("");
  let [yearwage, setYearwage] = useState("");
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

      // 特別處理真的有不填相關資料
      let object;
      if (yearwage) {
        object = {
          companyId,
          jobname,
          seniority,
          yearwage,
          satisfaction,
          experience,
          oneword,
        };
      } else {
        object = {
          companyId,
          jobname,
          seniority,
          satisfaction,
          experience,
          oneword,
        };
      }
      await axios.post(
        process.env.REACT_APP_DB_URL + "/post/meetArticle/post",
        object,
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
      setIsSubmitted(false);
      window.alert(e.response.data);
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
          <div className="text-[30px] font-bold text-center">面試評論</div>
          <div className="flex items-center justify-between gap-[10px]">
            <span className="font-bold ">應徵職務:</span>
            <div className="flex-grow">
              <input
                onChange={(e) => {
                  setJobname(e.target.value);
                }}
                minLength={1}
                maxLength={50}
                placeholder="後端工程師 等"
                className="w-full outline-none p-2  bg-slate-100"
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
            <span className="font-bold ">前公司年薪(萬):</span>
            <div className="flex-grow">
              <input
                onChange={(e) => {
                  setYearwage(e.target.value);
                }}
                placeholder="可不透露，空白即可"
                type="number"
                min={30}
                max={2000}
                step="1"
                className="appearance-none w-full outline-none p-2  bg-slate-100"
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-[10px]">
            <span className="font-bold ">面試滿意度:</span>
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
            <span className="font-bold ">面試心得:</span>
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
            <span className="font-bold ">一句話說明此面試:</span>
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
              className="py-2 px-[100px] bg-purple-300 rounded-[10px] text-[24px] font-bold"
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

export default MeetPost;
