import React from "react";
import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Tooltip,
    Cell,
} from "recharts";

const COLORS = ['#1083EF','#F17471',];
const WinRatePieChart = () => {
    return (
        <ResponsiveContainer width={200} height={96}>
            <PieChart>
                <Pie
                    data={data}
                    innerRadius={25}
                    outerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))
                    }
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}
const data = [{
    name: "Win Rate",
    value: 60,
}, {
    name: "Lose Rate",
    value: 40,
}]
export default WinRatePieChart;
