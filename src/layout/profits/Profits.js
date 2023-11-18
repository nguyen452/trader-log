import React, { useEffect, useState } from "react";
import {
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip
} from "recharts";
import ButtonWithDropDownMenu from "../../components/common/ButtonWithDropDownMenu";
import { useSelector } from "react-redux";
import { selectSelectedPeriod, changePeriod } from "../../slice/periodSlice";
import getFilteredDataByPeriod from "../../utils/getFilteredDataBySelectedDay";

const chartStyle = {
    fontFamily: "Poppins",
    fontSize: "12px",
    fill: "#7B8289",
    padding: "8px",
};

const Profits = ({ data }) => {
    // const [filteredData, setFilteredData] = useState(data);
    // const selectedPeriod = useSelector(selectSelectedPeriod);

    // useEffect(() => {
    //     if (data) {
    //         setFilteredData(getFilteredDataByPeriod(data, selectedPeriod))
    //     }
    // },[data, selectedPeriod])

    return (
        <section className="flex flex-col bg-white font-light text-slate-900 rounded-3xl shadow-md p-4">
            <div id="title-date-container" className="my-8 ml-8">
                <h2 className="text-xl font-semibold">Accumulated Return</h2>
                {/* <div className="flex justify-end mr-8">
                    <ButtonWithDropDownMenu name={selectedPeriod} list={['All time', 'Year-to-date', 'Month-to-date', 'Week-to-date']} action={changePeriod}  />
                </div> */}
            </div>
            <ResponsiveContainer height={384}>
                <AreaChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="10%" stopColor="#2f70f2" stopOpacity={0.8} />
                            <stop offset="50%" stopColor="#2f70f2" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#2f70f2" stopOpacity={0.4} />
                        </linearGradient>
                    </defs>
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
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date" tick={{ ...chartStyle }} tickMargin={12} stroke=" #cbd5e1" />
                    <YAxis dataKey="Accumulated Profits" tick={{ ...chartStyle }}  tickMargin={12} stroke=" #cbd5e1"/>
                    <Area
                        type="monotone"
                        dataKey="Accumulated Profits"
                        stroke="#2f70f2"
                        strokeWidth={2}
                        dot={false}
                        fill="url(#gradient)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </section>
    );
};


export default Profits;
