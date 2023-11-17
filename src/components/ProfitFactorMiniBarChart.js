import React from "react";
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

const data = [
    { "profit factor": 1.5, date: "2023-11-01" },
    { "profit factor": 1.25, date: "2023-11-02" },
    { "profit factor": 1.24, date: "2023-11-03" },
    { "profit factor": 1.45, date: "2023-11-04" },
    { "profit factor": 1.65, date: "2023-11-05" },
    { "profit factor": 1.65, date: "2023-11-06" },
    { "profit factor": 1.65, date: "2023-11-07" },
    { "profit factor": 1.65, date: "2023-11-08" },
];

const ProfitFactorMiniBarChart = () => {
    return (
        <ResponsiveContainer width={200} height={96} className="bg-white/80">
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
                <Bar dataKey="profit factor" fill="#1083EF" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ProfitFactorMiniBarChart;
