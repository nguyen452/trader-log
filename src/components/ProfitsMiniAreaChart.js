import React from "react";
import {
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";
import {data} from "../layout/profits/Profits"

// import randomDailyProfitData from "../../random_daily_profit.json";

const chartStyle = {
    fontFamily: "Poppins",
    fontSize: "12px",
    fill: "#7B8289",
    padding: "8px",
};

const ProfitMiniAreaChart = () => {
    return (

            <ResponsiveContainer width={200} height={96}>
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


                    <Area
                        type="monotone"
                        dataKey="accumulated profits"
                        stroke="url(#gradient)"
                        strokeWidth={2}
                        dot={false}
                        fill="url(#gradient)"
                    />
                </AreaChart>
            </ResponsiveContainer>

    );
};
export default ProfitMiniAreaChart;
