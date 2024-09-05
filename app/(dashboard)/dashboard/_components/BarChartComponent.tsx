"use client";

import useProjectStore from "@/model/project";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const BarChartComponent = ({ data }: { data: any }) => {
  const { setActiveProject } = useProjectStore();

  // TODO: give correct type
  function onBarClick(project: any) {
    setActiveProject(project.id);
  }

  return (
    <div
      style={{
        width: "100%",
        height: 300,
        // backgroundColor: "#1F231F",
        backgroundColor: "#000000",
        borderRadius: "10px",
      }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <XAxis
            className="text-xs"
            // dataKey="project_name"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "white",
              textAnchor: "end", // Aligns the text properly after rotation
            }}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "white" }} />
          <Bar
            dataKey="completion_percentage"
            fill="white"
            radius={[5, 5, 0, 0]}
            barSize={10}
            className="cursor-pointer"
            onClick={onBarClick}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
