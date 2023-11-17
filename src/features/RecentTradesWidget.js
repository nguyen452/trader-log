import React from "react";
import Calendar from "../components/Calendar";
import { useSelector } from "react-redux";
import { selectSelectedDate } from "../slice/calendarSlice";
import Table from "../components/Table";

const testData = [
    {
        side: "long",
        symbol: "AAPL",
        Tags: ["tech", "growth"],
        "P&L": 100,
        Volume: 100,
    },
    {
        side: "long",
        symbol: "AAPL",
        Tags: ["tech", "growth"],
        "P&L": 100,
        Volume: 100,
    },
    {
        side: "long",
        symbol: "AAPL",
        Tags: ["tech", "growth"],
        "P&L": 100,
        Volume: 100,
    },
    {
        side: "long",
        symbol: "AAPL",
        Tags: ["tech", "growth"],
        "P&L": 100,
        Volume: 100,
    },
];

const RecentTradesWidget = () => {
    const selectedDate = useSelector(selectSelectedDate);
    console.log(selectedDate);
    return (
        <div className="flex flex-col md:flex-row items-center bg-white w-full  md:gap-4 rounded-3xl shadow-md p-4">
            <Calendar className='flex' />
            <div className="overflow-x-auto w-full">
                <h2 className="font-bold text-slate-800 text-xl p-8">
                    {selectedDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
                </h2>
                <Table data={testData} title="selectedDate" />
            </div>
        </div>
    );
};

export default RecentTradesWidget;
