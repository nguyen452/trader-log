import React from "react";
import {
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

const AverageWinVsLossBarChart = ({ data }) => {
    return (
        <ResponsiveContainer width={150} height={115}>
            <BarChart data={data}>
            <Tooltip
                    contentStyle={{
                        backgroundColor: "rgb(255 255 255 / 0.9)",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                        padding: "12px",
                        fontFamily: "Poppins",
                        fontSize: "12px",
                        color: "#7B8289",
                    }}
                    cursor={{ fill: "rgb(241 245 249 / 0.97)" }}
                />
                <XAxis
                    dataKey="name"
                    tick={{ ...chartStyle }}
                    tickMargin={12}
                    stroke=" #cbd5e1"
                />
                <YAxis tick={{ ...chartStyle }} />
                <Bar dataKey="averageWin" fill="#1083EF" />
                <Bar dataKey="averageLoss" fill="#F17471" />

            </BarChart>
        </ResponsiveContainer>
    );
};

export default AverageWinVsLossBarChart;
