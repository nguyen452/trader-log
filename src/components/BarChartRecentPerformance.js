import React from "react";
import {
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";


const chartStyle = {
    fontFamily: "Poppins",
    fontSize: "12px",
    fill: "#7B8289",
    padding: "8px",
};

const BarChartRecentPerformance = ({ data }) => {
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
                <Tooltip
                    contentStyle={{
                        backgroundColor: "rgb(255 255 255 / 0.97)",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                        padding: "12px",
                        fontFamily: "Poppins",
                        fontSize: "12px",
                        color: "#7B8289",
                    }}
                    cursor={{fill: 'rgb(241 245 249 / 0.97)'}}

                />
                    <XAxis
                        dataKey="date"
                        tick={{ ...chartStyle }}
                        tickMargin={12}
                        stroke=" #cbd5e1"
                    />
                    <YAxis
                        dataKey="profits"
                        tick={{ ...chartStyle }}
                        tickMargin={12}
                        stroke=" #cbd5e1"
                    />
                    <Bar dataKey="profits">
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={getBarFill(entry.profits)}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </section>
    );
};

export default BarChartRecentPerformance;
