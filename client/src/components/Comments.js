import React from "react";
import TextareaAutosize from "react-textarea-autosize";

const Comments = () => {
  const comments = [
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "John Doe",
      userId: 1,
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "Jane Doe",
      userId: 2,
      profilePicture:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

  return (
    <div>
      <div className="comments p-[20px] max-h-[500px] overflow-scroll no-scrollbar">
        {comments.map((comment, key) => (
          <div className="comment flex mt-2">
            <div className="flex gap-3">
              <img
                className="w-[40px] h-[40px] object-cover rounded-full shrink-0"
                src={comment.profilePicture}
                alt=""
              />
              <div className=" bg-slate-100 p-2 rounded-[10px] ">
                <div className="info flex gap-3 ">
                  <div className="font-bold">{comment.name}</div>
                  <div>{key + 1 + "F"}</div>
                  <div className="date">1 hour ago</div>
                </div>
                <div>{comment.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="write flex items-center gap-3 border-t-2 shadow-xl p-[20px]">
        <img
          className="w-[40px] h-[40px] object-cover rounded-full shrink-0"
          src={
            "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600"
          }
          alt=""
        />
        <div className="bg-slate-200 flex w-full p-[10px] rounded-[10px] ">
          <TextareaAutosize
            className="w-full outline-none bg-slate-200 overflow-hidden resize-none"
            placeholder="你在想甚麼?"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 mx-5 text-3xl"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Comments;
