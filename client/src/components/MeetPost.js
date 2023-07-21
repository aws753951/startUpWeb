import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import TextareaAutosize from "react-textarea-autosize";

const MeetPost = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <div className="bg-white gap-[20px] flex flex-col  rounded-[10px] p-5 mt-2 ">
        <div className="text-[30px] font-bold text-center">面試評論</div>
        <div className="flex items-center justify-between gap-[30px]">
          <span className="font-bold text-[24px]">應徵職務:</span>
          <div className="flex-grow">
            <input
              placeholder="後端工程師 等"
              className="w-full outline-none p-2 text-[24px] bg-slate-100"
              required
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-[30px]">
          <span className="font-bold text-[24px]">相關年資:</span>
          <div className="flex-grow">
            <input
              placeholder="0~20 年"
              type="number"
              min={0}
              max={20}
              step="0.5"
              className="appearance-none w-full outline-none p-2 text-[24px] bg-slate-100"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-[30px]">
          <span className="font-bold text-[24px]">前公司年薪(萬):</span>
          <div className="flex-grow">
            <input
              placeholder="可不透露，空白即可"
              type="number"
              min={0}
              max={2000}
              step="1"
              className="appearance-none w-full outline-none p-2 text-[24px] bg-slate-100"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-[30px]">
          <span className="font-bold text-[24px]">面試滿意度:</span>
          <div className="flex-grow">
            <input
              placeholder="1~5，你推不推薦?"
              type="number"
              min={1}
              max={5}
              step="0.1"
              className="appearance-none w-full outline-none p-2 text-[24px] bg-slate-100"
              required
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-[30px]">
          <span className="font-bold text-[24px]">面試心得:</span>
          <div className="flex-grow">
            <TextareaAutosize
              placeholder="請誠實分享，誤加水造謠等，最多1萬字"
              maxLength="10000"
              className="w-full text-[24px] outline-none bg-slate-100 overflow-hidden resize-none p-2 "
            ></TextareaAutosize>
          </div>
        </div>
        <div className="flex items-center justify-center gap-[30px]">
          <span className="font-bold text-[24px]">一句話說明此面試:</span>
          <div className="flex-grow">
            <input
              placeholder="50字內，非必填"
              className="w-full outline-none p-2 text-[24px] bg-slate-100"
              maxLength="50"
            />
          </div>
        </div>

        <div className="flex justify-center items-center">
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="py-2 px-[100px] bg-purple-300 rounded-[10px] text-[24px] font-bold"
          >
            提交
          </button>
        </div>
      </div>
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
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-black hover:bg-red-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      無情提交
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
