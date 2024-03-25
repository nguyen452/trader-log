import React from "react";
import {
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";

const chartStyle = {
    fontFamily: "Poppins",
    fontSize: "12px",
    fill: "#7B8289",
    padding: "8px",
};

const ProfitMiniAreaChart = ({ data, yAxis, xAxis, cartesianGrid, width, height }) => {
    console.log(width, height)
    return (
        <ResponsiveContainer width={width} height={height}>
            <AreaChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1083EF" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#1083EF" stopOpacity={0.0} />
                    </linearGradient>
                </defs>

                {yAxis &&  <YAxis dataKey="Accumulated Profits" tick={{ ...chartStyle }}  tickMargin={12} stroke=" #cbd5e1"/>}
                {xAxis && <XAxis />}
                {cartesianGrid && <CartesianGrid strokeDasharray="3 3" />}

                <Area
                    type="monotone"
                    dataKey="Accumulated Profits"
                    stroke="url(#gradient)"
                    strokeWidth={2}
                    dot={false}
                    fill="#1083EF"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};
export default ProfitMiniAreaChart;
