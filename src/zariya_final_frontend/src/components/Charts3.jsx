import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const donationData = [
  { name: "Net Banking", value: 600000 },
  { name: "Bank RTGS", value: 150000 },
  { name: "UPI", value: 200000 },
];

const COLORS = ["#3b82f6", "#10b981", "#facc15"];

export default function TotalDonationDonut() {
  const total = donationData.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <>
    <div className="flex flex-col-2 w-full p-4">
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
     
      <div className="relative w-full h-72">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={donationData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={3}
              animationDuration={1200} // Short animation
            >
              {donationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Text */}
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-xl font-bold text-gray-800">₹{total.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Donated</p>
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
  <div className="flex items-center gap-2">
    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
    Net Banking
  </div>
  <div className="flex items-center gap-2">
    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
    RTGS
  </div>
  <div className="flex items-center gap-2">
    <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
    UPI
  </div>
</div>
    </div>
    <h2 className="flex mx-auto text-2xl font-bold text-center mb-4 text-gray-700 p-20">
        Total Donations Received till date
      </h2>
      </div>
    </>
  );
}