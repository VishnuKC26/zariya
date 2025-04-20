import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

const Data = [
    { name: "", value: 65 },
    { name: "", value: 50 },
    { name: "", value: 35 },
];
const COLORS = ["#ef4444", "#8b5cf6", "#22c55e"]; // Red, Purple, Green

export default function DonutChart() {
    const total = Data.reduce((sum, item) => sum + item.value, 0);

    return (
        <>
        <div className="flex flex-col-2 w-full p-4 ">
            <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg relative">
                <div className="relative w-full h-64">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={Data}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={110}
                                paddingAngle={3}
                                dataKey="value"
                                isAnimationActive={true} // 🔥 Enables animation
                                animationDuration={1000} // 🕒 Duration in ms
                                
                            >
                                {Data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* ✅ Center text inside donut */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <p className="text-3xl font-bold text-blue-500">{total}+</p>
                        <p className="text-sm text-gray-600"> NGOs</p>
                    </div>
                </div>
                <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        Health
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                        Education
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        Environment
                    </div>
                </div>
            </div>
            <div className="flex mx-auto text-2xl font-bold text-center mb-4 text-gray-700 p-20">
                <h1>NOGs Registered all over India under different categories</h1>
            </div>
            </div>
        </>
    );
}