import React from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
    { "profit factor": 1.5, date: "2023-11-01" },
    { "profit factor": 1.25, date: "2023-11-02" },
    { "profit factor": 1.24, date: "2023-11-03" },
    { "profit factor": 1.45, date: "2023-11-04" },
    { "profit factor": 1.65, date: "2023-11-05" },
    { "profit factor": 1.65, date: "2023-11-06" },
    { "profit factor": 1.65, date:  "2023-11-07" },
    { "profit factor": 1.65, date: "2023-11-08" },
]

const ProfitFactorMiniBarChart = () => {
    return (
        <ResponsiveContainer width={200} height={96}>
            <BarChart data={data}>
                <Bar dataKey="profit factor" fill="#1083EF" />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default ProfitFactorMiniBarChart;
