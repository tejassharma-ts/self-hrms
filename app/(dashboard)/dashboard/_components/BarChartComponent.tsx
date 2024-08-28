import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'A', uv: 40 },
  { name: 'B', uv: 32 },
  { name: 'C', uv: 63 },
  { name: 'D', uv: 32 },
  { name: 'E', uv: 52 },
  { name: 'F', uv: 23 },
  { name: 'G', uv: 34 },
  { name: 'H', uv: 32 },
  { name: 'I', uv: 48 },
  { name: 'J', uv: 100 },
];

const BarChartComponent = () => {
  return (
    <div style={{ width: '100%', height: 300, backgroundColor: '#1F231F', borderRadius:'10px' }}>
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
            tick={{ fill: 'white' }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'white' }} 
          />
          <Bar 
            dataKey="uv" 
            fill="white" 
            radius={[5, 5, 0, 0]}
            barSize={10}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;