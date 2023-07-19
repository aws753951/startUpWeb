import React from "react";
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
} from "recharts";

const View = () => {
  const data = [
    { x: 100, y: 2 },
    { x: 120, y: 1 },
    { x: 170, y: 3 },
    { x: 140, y: 2.5 },
    { x: 150, y: 4 },
    { x: 110, y: 2.8 },
  ];

  const data2 = [
    {
      subject: "Math",
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: "Chinese",
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: "English",
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: "Geography",
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: "Physics",
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: "History",
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ];

  return (
    <div className="md:mx-[10px]  mt-2 ">
      <div className="flex flex-col gap-[10px]">
        <div className="bg-white rounded-[10px] p-5">
          <h1 className="text-center font-bold text-[20px]">薪水分布</h1>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 0,
                left: 0,
              }}
            >
              <XAxis type="number" dataKey="x" name="stature" unit="cm" />
              <YAxis type="number" dataKey="y" name="weight" unit="kg" />
              <Scatter name="A school" data={data} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-[10px] p-5">
          <h1 className="text-center font-bold text-[20px]">綜合評分</h1>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data2}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 150]} />
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
      <div className="bg-white rounded-[10px] p-5 mt-2 ">
        <div className="text-center font-bold text-[30px]">某某公司</div>
        <div className="text-center">薪資中位數: 123</div>
        <div className="text-center">平均滿意度: 4.6</div>
      </div>
    </div>
  );
};

export default View;
