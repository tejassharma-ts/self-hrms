"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Data = {
  name: string;
  uv: number;
}[];

const BarChartComponent = ({ data }: { data: Data }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // TODO: give the correct type
  function handleBarClick(data: any) {
    const params = new URLSearchParams(searchParams);
    params.set("project", data.name);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div
      style={{
        width: "100%",
        height: 300,
        backgroundColor: "#1F231F",
        borderRadius: "10px",
      }}
    >
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "white" }}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "white" }} />
          <Bar
            dataKey="uv"
            fill="white"
            radius={[5, 5, 0, 0]}
            barSize={10}
            className="cursor-pointer"
            onClick={handleBarClick}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;

