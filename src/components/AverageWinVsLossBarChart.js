import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const chartStyle = {
    fontFamily: "Poppins",
    fontSize: "12px",
    fill: "#7B8289",
    padding: "8px",
};

const AverageWinVsLossBarChart = ({ data }) => {
    return (
            <ResponsiveContainer width={150} height={150}>
                <BarChart data={data}>
                    <XAxis dataKey="name" tick={{ ...chartStyle }} tickMargin={12} stroke=" #cbd5e1" />
                    <YAxis />
                    <Bar dataKey="averageWin" fill="#1083EF" />
                    <Bar dataKey="averageLoss" fill="#F17471" />
                    <Tooltip />
                </BarChart>
            </ResponsiveContainer>
    )
}

export default AverageWinVsLossBarChart;;
