import React from "react";
import {
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";
// import randomDailyProfitData from "../../random_daily_profit.json";

const chartStyle = {
    fontFamily: "Poppins",
    fontSize: "12px",
    fill: "#7B8289",
    padding: "8px",
};

const Profits = () => {
    return (
        <section className="flex flex-col bg-white font-light text-slate-900 rounded-3xl shadow-md p-4">
            <div id="title-date-container" className="my-6 ml-6">
                <h2 className="text-xl font-semibold">Profits</h2>
            </div>
            <ResponsiveContainer height={384}>
                <AreaChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="10%" stopColor="#2f70f2" stopOpacity={0.8} />
                            <stop offset="50%" stopColor="#2f70f2" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#2f70f2" stopOpacity={0.4} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date" tick={{ ...chartStyle }} tickMargin={12} stroke=" #cbd5e1" />
                    <YAxis dataKey="accumulated profits" tick={{ ...chartStyle }}  tickMargin={12} stroke=" #cbd5e1"/>
                    <Area
                        type="monotone"
                        dataKey="accumulated profits"
                        stroke="#2f70f2"
                        strokeWidth={2}
                        dot={false}
                        fill="url(#gradient)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </section>
    );
};
export const data = [
    { date: "2023-11-01", "accumulated profits": 100 },
    { date: "2023-11-02", "accumulated profits": 150 },
    { date: "2023-11-03", "accumulated profits": 210 },
    { date: "2023-11-04", "accumulated profits": 280 },
    { date: "2023-11-05", "accumulated profits": 360 },
    { date: "2023-11-06", "accumulated profits": 450 },
    { date: "2023-11-07", "accumulated profits": 550 },
    { date: "2023-11-08", "accumulated profits": 660 },
    { date: "2023-11-09", "accumulated profits": 780 },
    { date: "2023-11-10", "accumulated profits": 910 },
  ];

export default Profits;
