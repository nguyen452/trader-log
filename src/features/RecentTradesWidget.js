import React from "react";
import Calendar from "../components/Calendar";
import TradesInSelectedDay from "../components/TradesInSelectedDay";
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
    return (
        <div className="flex flex-col md:flex-row items-center bg-white w-full  md:gap-4 rounded-3xl shadow-md p-4">
            <Calendar className='flex' />
            <div className="overflow-x-auto w-full">
                <h2 className="font-bold text-slate-800 text-xl p-8">
                    October 28 2023
                </h2>
                <Table data={testData} title="October 28 2023" />
            </div>
        </div>
    );
};

export default RecentTradesWidget;
