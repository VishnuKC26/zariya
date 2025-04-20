import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const userData = [
  { month: "", users: 30 },
  { month: "", users: 100 },
  { month: "", users: 150 },
  { month: "", users: 350 },
  { month: "", users: 300 },
  { month: "", users: 500 },
  { month: "", users: 600 },
];

export default function MonthlyUserGrowthChart() {
  return (
    <>
   
    <div className="flex flex-col-2 w-[99%] p-4">
    <h2 className="flex mx-auto text-2xl font-bold text-center mb-4 text-gray-700 p-20">
        Monthly Growth of Registered Individuals
      </h2>
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={userData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
         
          <XAxis dataKey="month" tick={{ fontSize: 16 }} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar
            dataKey="users"
            fill="#3b82f6"
            barSize={25}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
   
    </div>
   
    </>
  );
}