import React from "react";
import {
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const data = [
    { date: 'Nov 1', 'profits': 100 },
    { date: 'Nov 5', 'profits': 200 },
    { date: 'Nov 1', 'profits': -50 },
    { date: 'Nov 1', 'profits': 150 },
    { date: 'Nov 1', 'profits': -30 },
]
const chartStyle = {
    fontFamily: "Poppins",
    fontSize: "12px",
    fill: "#7B8289",
    padding: "8px",
};

const BarChartRecentPerformance = () => {
    // Function to determine bar color based on the "profits" value
    const getBarFill = (value) => {
        return value > 0 ? "#1083EF" : "#F17471";
    };
    return (
        <section className="flex flex-col bg-white font-light text-slate-900  rounded-3xl shadow-md p-4">
            <div id="title-date-container" className="my-6 ml-6">
                <h2 className="text-xl font-semibold">Recent Performance</h2>
            </div>
            <ResponsiveContainer width="100%" height={384}>
                <BarChart data={data}>
                    <XAxis dataKey="date" tick={{ ...chartStyle }} tickMargin={12} stroke=" #cbd5e1" />
                    <YAxis dataKey="profits" tick={{ ...chartStyle }} tickMargin={12} stroke=" #cbd5e1" />
                    <Bar dataKey="profits">
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getBarFill(entry.profits)} />
                            ))
                        }
                    </Bar>
                    <Tooltip />
                </BarChart>
            </ResponsiveContainer>
        </section>
    )
};

export default BarChartRecentPerformance;
