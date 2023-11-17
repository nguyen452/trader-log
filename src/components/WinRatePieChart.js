import React from "react";
import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Tooltip,
    Cell,
} from "recharts";

const COLORS = ['#1083EF','#F17471', 'FED766'];
const WinRatePieChart = ({ data }) => {
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
                <Tooltip contentStyle = {{
                    backgroundColor: "rgb(255 255 255 / 0.97)",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    padding: "12px",
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    color: "#7B8289",
                    }}
                 />
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
