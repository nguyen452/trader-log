import React, {useEffect, useState} from "react";
// import TopTrades from "../../features/topTrades/TopTrades";
// import Profits from "../layout/profits/Profits";
import DashboardGrid from "../layout/DashboardGrid";
import Cards from "../components/Cards";
import Profits from "../layout/profits/Profits";
import RecentTradesWidget from "../features/RecentTradesWidget";
import ProfitMiniAreaChart from "../components/ProfitsMiniAreaChart";
import ProfitFactorMiniBarChart from "../components/ProfitFactorMiniBarChart";
import WinRatePieChart from "../components/WinRatePieChart";
import BarChartRecentPerformance from "../components/BarChartRecentPerformance";
import Table from "../components/Table";
import AverageWinVsLossBarChart from "../components/AverageWinVsLossBarChart";
const tradeData = [
    {
        ID: 1,
        Date: "2023-10-28",
        Side: "Buy",
        Symbol: "AAPL",
        Tags: ["Tech", "US"],
        "P&L": 50,
        Fees: 2.5,
        Volume: 100,
        Executions: 1,
    },
    {
        id: 2,
        date: "2023-10-27",
        side: "Sell",
        symbol: "MSFT",
        Tags: ["Tech", "US"],
        "P&L": 20,
        Fees: 1.5,
        Volume: 50,
        Executions: 2,
    },
    {
        id: 3,
        date: "2023-10-26",
        side: "Buy",
        symbol: "GOOGL",
        Tags: ["Tech", "US"],
        "P&L": -10,
        Fees: 2.0,
        Volume: 75,
        Executions: 1,
    },
];
const DashBoard = () => {
    const [tradesPerformance, setTradesPerformance] = useState({});

    useEffect(() => {
        const pullTradeData = async() => {
            const response = await fetch('http://localhost:4000/api/trades/tradeMetrics', {
                method: 'GET',
                credentials: 'include'
            })
            const data =  await response.json();
            setTradesPerformance(data.tradingPerformanceMetrics)
        }
        pullTradeData()
    }, []);

    console.log(tradesPerformance)
    return (
        <main className="flex w-full">
            <div className="w-full">
                <DashboardGrid
                    gridItems={{
                        card1: (
                            <Cards
                                title='Total Return'
                                content={tradesPerformance.totalReturn}
                                chart={<ProfitMiniAreaChart data={data} />}
                            />
                        ),
                        card2: (
                            <Cards
                                title="Profit Factor"
                                content={tradesPerformance.profitFactor}
                                chart={<ProfitFactorMiniBarChart data={data} />}
                            />
                        ),
                        card3: (
                            <Cards
                                title="Win Rate"
                                content={`${tradesPerformance.winningPercentage} %`}
                                chart={< WinRatePieChart data={data} />}
                            />
                        ),
                        card4: (
                            <Cards
                                title="Average Win vs Loss"
                                content={`Total Trades: ${tradesPerformance.totalTradeQuantity}`}
                                chart={<AverageWinVsLossBarChart data={data} />}
                            />
                        ),
                        recentTradesWidget: <RecentTradesWidget />,
                        equityCurve: <Profits />,
                        recentTrade: <BarChartRecentPerformance />,
                        dataTable: (
                            <div className=" w-full flex flex-col bg-white rounded-3xl shadow-md overflow-x-auto">
                                <h2 className="font-bold text-slate-800 text-xl p-8">
                                    title
                                </h2>
                                <Table data={tradeData} />
                                <div className="text-right p-4 ">
                                    <button className="bg-zinc-100 p-2 rounded-xl">
                                        View All
                                    </button>
                                </div>
                            </div>
                        ),
                    }}
                />
            </div>

            <div className="flex flex-col gap-4 h-screen border-l"></div>
        </main>
    );
};

export default DashBoard;
