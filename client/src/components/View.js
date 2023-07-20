import { React, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Label,
} from "recharts";

import JobPost from "./JobPost";
import MeetPost from "./MeetPost";

const View = ({ meet, setMeet, write, setWrite }) => {
  let [isOpen, setIsOpen] = useState(false);
  const data = [
    { x: 100, y: 2 },
    { x: 120, y: 1 },
    { x: 170, y: 3 },
    { x: 140, y: 2.5 },
    { x: 150, y: 4 },
    { x: 110, y: 15 },
  ];

  const data2 = [
    {
      subject: "滿意度",
      A: 1,
      B: 3,
      fullMark: 5,
    },
    {
      subject: "企業氛圍",
      A: 2,
      B: 4,
      fullMark: 5,
    },

    {
      subject: "輕鬆程度",
      A: 2,
      B: 4.4,
      fullMark: 5,
    },
    {
      subject: "Loading",
      A: 3.5,
      B: 1,
      fullMark: 5,
    },
    {
      subject: "加班程度",
      A: 2.3,
      B: 3.6,
      fullMark: 5,
    },
  ];

  return (
    <div className="md:mx-[10px]  mt-2 ">
      {!write && (
        <div className="flex flex-col gap-[10px] ">
          <div className="bg-white rounded-[10px] p-5 ">
            <h1 className="text-center font-bold text-[20px] ">薪水分布</h1>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart
                margin={{
                  top: 20,
                  right: 50,
                  bottom: 15,
                  left: 15,
                }}
              >
                <XAxis type="number" dataKey="x" name="薪水" unit="萬">
                  <Label
                    className="font-bold"
                    value="年薪"
                    offset={-13}
                    position="insideBottom"
                  />
                </XAxis>

                <YAxis type="number" dataKey="y" name="相關年資" unit="年">
                  <Label
                    className="font-bold"
                    value="相關年資"
                    angle={-90}
                    offset={-5}
                    position="insideLeft"
                  />
                </YAxis>
                <Scatter name="薪水分布" data={data} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-[10px] p-5">
            <h1 className="text-center font-bold text-[20px]">綜合評分</h1>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data2}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={18} domain={[0, 5]} />
                <Radar
                  name="本公司"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Radar
                  name="同薪平均"
                  dataKey="B"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      <div className="bg-white gap-[20px] flex justify-between rounded-[10px] p-5 mt-2 ">
        {!meet && (
          <div
            onClick={() => {
              setMeet(!meet);
            }}
            className="bg-purple-300 flex-1 flex justify-center items-center rounded-[20px] cursor-pointer"
          >
            <div className="text-[24px] font-bold text-center">轉面試頁面</div>
          </div>
        )}
        {meet && (
          <div
            onClick={() => {
              setMeet(!meet);
            }}
            className="bg-blue-300 flex-1 flex justify-center items-center rounded-[20px] cursor-pointer"
          >
            <div className="text-[24px] font-bold text-center">轉工作頁面</div>
          </div>
        )}
        <div className="flex-2 w-[40%] xl:w-[60%] ">
          <div className="text-center font-bold text-[30px]">某某公司</div>
          <div className="text-center">薪資中位數: 12萬</div>
          <div className="text-center">平均滿意度: 4.6</div>
        </div>
        {!meet && (
          <div
            onClick={() => {
              setWrite(!write);
            }}
            className="bg-blue-300  flex-1 flex justify-center items-center rounded-[20px] cursor-pointer"
          >
            <div className="text-[24px] font-bold text-center">
              {write ? "回工作頁面" : "寫工作評論"}
            </div>
          </div>
        )}
        {meet && (
          <div
            onClick={() => {
              setWrite(!write);
            }}
            className="bg-purple-300  flex-1 flex justify-center items-center rounded-[20px] cursor-pointer"
          >
            <div className="text-[24px] font-bold text-center">
              {write ? "回面試頁面" : "寫面試評論"}
            </div>
          </div>
        )}
      </div>
      {write && !meet && <JobPost isOpen={isOpen} setIsOpen={setIsOpen} />}
      {write && meet && <MeetPost isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default View;
