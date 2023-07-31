import React from "react";

const Home = () => {
  return (
    <div className="col-span-5 md:col-span-3 scrollset ">
      <div className="shadow-lg rounded-[10px] bg-white mt-2 mx-2 p-2 ">
        <div className="text-center border-b-2 text-[36px] font-bold">公告</div>
        <div className="text-center ">
          大家好，該網站提供所有求職者在求職選找工作的時候能有個更加透明的管道
        </div>
        <div className="text-center">
          提供的服務包含最新面試消息，公司薪水，即時討論平台
        </div>
        <div className="text-center">
          請點擊上方搜尋欄位，找尋你想要的公司吧
        </div>
      </div>
      <div className="shadow-lg rounded-[10px] bg-white mt-2 mx-2 p-2 ">
        <div className="text-center border-b-2 text-[36px] font-bold">
          網站初衷
        </div>
        <div className="text-center ">
          因為目前擁有相關求職資訊平台，大多需要付費
        </div>
        <div className="text-center">導致勞工與資方站在資訊不對等的角度</div>
        <div className="text-center">
          我開發這網站的初衷就是希望能夠減少這現象
        </div>
        <div className="text-center">
          讓大家可以以更加透明的角度，找到工作環境、薪資更佳的工作
        </div>
        <div className="text-center">
          也受益於Dcard上有人提供科技業薪水分享的資訊
        </div>
        <div className="text-center">
          覺得這個，有料，所以做出該網站跟大家共享
        </div>
      </div>
      <div className="shadow-lg rounded-[10px] bg-white mt-2 mx-2 p-2 ">
        <div className="text-center border-b-2 text-[36px] font-bold">
          網站資料
        </div>
        <div className="text-center ">
          已事前跟在Dcard上的作者「不刪文的小可愛」取得同意
        </div>
        <div className="text-center">
          本網站使用該作者提供的google表單作為初始資料
        </div>
        <div className="text-center">
          所以請勿拿這些資料作為個人商業化的行為
        </div>
        <div className="text-center">感謝配合</div>
      </div>
      <div className="shadow-lg rounded-[10px] bg-white mt-2 mx-2 p-2 ">
        <div className="text-center border-b-2 text-[36px] font-bold">
          作者私心
        </div>
        <div className="text-center ">本人也是近期想換工作</div>
        <div className="text-center">因此需要能夠有面試的籌碼</div>
        <div className="text-center">
          我要的不多，就是大家會持續使用該網站，並正確地提供工作與面試經驗
        </div>
        <div className="text-center">以及提供該網站相關可以優化的建議</div>
        <div className="text-center">就是對我最大的幫助了</div>
        <div className="text-center">
          若有相關對於網站的建議，請寄相關資訊到我
          <a className="text-blue-500" href="mailto: a0983204766@gmail.com">
            信箱
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
