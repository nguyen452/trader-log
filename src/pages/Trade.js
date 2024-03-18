import React from "react";
import TradingViewCandleStickChart from "../components/common/TradingViewCandleStickChart";
import Table from "../components/Table";
import formatDate from "../utils/formatDates";

const data = [
    {
        id: 1,
        symbol: "AAPL",
        date: "2021-01-01",
        PnL: 100,
        shares: 100,
    },
    {
        id: 2,
        symbol: "AAPL",
        date: "2021-01-01",
        PnL: 100,
        shares: 100,
    },
    {
        id: 3,
        symbol: "AAPL",
        date: "2021-01-01",
        PnL: 100,
        shares: 100,
    },
    {
        id: 4,
        symbol: "AAPL",
        date: "2021-01-01",
        PnL: 100,
        shares: 100,
    },
    {
        id: 5,
        symbol: "AAPL",
        date: "2021-01-01",
        PnL: 100,
        shares: 100,
    },
    {
        id: 6,
        symbol: "AAPL",
        date: "2021-01-01",
        PnL: 100,
        shares: 100,
    },
    {
        id: 7,
        symbol: "AAPL",
        date: "2021-01-01",
        PnL: 100,
        shares: 100,
    },
    {
        id: 8,
        symbol: "AAPL",
        date: "2021-01-01",
        PnL: 100,
        shares: 100,
    },
    {
        id: 9,
        symbol: "AAPL",
        date: "2021-01-01",
        PnL: 100,
        shares: 100,
    },
    {
        id: 10,
        symbol: "AAPL",
        date: "2021-01-01",
        PnL: 100,
        shares: 100,
    },
];

const Trade = () => {
    return (
        <main className="container mx-auto w-full">
            <div className="flex flex-col gap-4 p-4">
                <section className="flex justify-between items-center">
                    <div className="text-xl font-semibold flex gap-8 ">
                        <h1>AAPL</h1>
                        <h2 className="font-medium">{formatDate("2023-01-01")}</h2>
                    </div>
                    <div className="flex gap-8 items-center text-xl">
                        <h3>P&L</h3>
                        <h3>Shares Traded: 100</h3>
                    </div>
                </section>
                <section className="grow bg-white p-4 rounded-xl shadow-md">
                    <h2 className="font-medium text-xl mb-4 ">Executions</h2>
                    <Table data={data} />
                </section>
                <div className="w-full h-96 p-4 rounded-xl shadow-md bg-white">
                <TradingViewCandleStickChart />
            </div>
            </div>

        </main>
    );
};
export default Trade;
