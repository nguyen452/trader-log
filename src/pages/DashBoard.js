import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectSelectedPeriod} from "../slice/periodSlice";
import getLastNumbersOfDayProfit from "../utils/getLastNumbersOfDayProfit";
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
import WelcomeBar from "../components/WelcomeBar";
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
    const selectedPeriod = useSelector(selectSelectedPeriod);

    const transformPeriodToKebabCase = (period) => {
        period = period.split(" ");
        return period.join("-").toLowerCase();
    }

    useEffect(() => {
        const pullTradeData = async() => {
            const response = await fetch(`http://localhost:4000/api/trades/tradeMetrics/${transformPeriodToKebabCase(selectedPeriod)}`, {
                method: 'GET',
                credentials: 'include'
            })
            const data =  await response.json();
            setTradesPerformance(data.tradingPerformanceMetrics)
        }
        pullTradeData()
    }, [selectedPeriod]);
    console.log(tradesPerformance.profitsPerDay)
    return (
        <main className="flex w-full">
            <div className="w-full">
                <WelcomeBar />
                <DashboardGrid
                    gridItems={{
                        card1: (
                            <Cards
                                title='Total Return'
                                content={tradesPerformance.totalReturn}
                                chart={<ProfitMiniAreaChart data={tradesPerformance.accumulatedProfitsPerDay} />}
                            />
                        ),
                        card2: (
                            <Cards
                                title="Profit Factor"
                                content={tradesPerformance.profitFactor}
                                chart={<ProfitFactorMiniBarChart data={tradesPerformance.profitFactor} />}
                            />
                        ),
                        card3: (
                            <Cards
                                title="Win Rate"
                                content={`${tradesPerformance.winningPercentage} %`}
                                chart={< WinRatePieChart   data={[
                                    {
                                        name: "Total Winning Trades",
                                        value: tradesPerformance.totalWinningTrades,
                                    },
                                    {
                                        name: "Total Losing Trades",
                                        value: tradesPerformance.totalLosingTrades,
                                    },
                                    {
                                        name: "Breakeven",
                                        value: tradesPerformance.totalBreakevenTrades
                                    }
                                ]} />}
                            />
                        ),
                        card4: (
                            <Cards
                                title="Average Win vs Loss"
                                content={`${tradesPerformance.averageReturn}`}
                                chart={<AverageWinVsLossBarChart data={[{name: 'averages', averageWin: tradesPerformance.averageWin, averageLoss: tradesPerformance.averageLoss}]} />}
                            />
                        ),
                        recentTradesWidget: <RecentTradesWidget />,
                        equityCurve: <Profits data={ tradesPerformance.accumulatedProfitsPerDay} />,
                        recentTrade: <BarChartRecentPerformance data={getLastNumbersOfDayProfit(tradesPerformance.profitsPerDay, 5)}/>,
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
