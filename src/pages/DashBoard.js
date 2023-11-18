import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchDashboard,
    changePeriod,
    filteredBySelectedPeriod,
    selectDashboardData,
    selectSelectedPeriod,
    selectDashboardIsLoading,
    selectDashboardHasError
} from "../slice/dashboardSlice";
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
    const dashboardData = useSelector(selectDashboardData);
    const selectedPeriod = useSelector(selectSelectedPeriod);
    const isLoading = useSelector(selectDashboardIsLoading);
    const hasError = useSelector(selectDashboardHasError);
    const dispatch = useDispatch();

    //helper function to transform period to kebab case
    const transformPeriodToKebabCase = (period) => {
        period = period.split(" ");
        return period.join("-").toLowerCase();
    };
    useEffect(() => {
        dispatch(fetchDashboard(transformPeriodToKebabCase(selectedPeriod)));
    }, [selectedPeriod, dispatch]);

    if(isLoading || !dashboardData) {
        return <div>Loading...</div>
    } else if(hasError) {
        return <div>Something went wrong...</div>
    }

    return (
        <main className="flex w-full">
            <div className="w-full">
                <WelcomeBar />
                <DashboardGrid
                    gridItems={{
                        card1: (
                            <Cards
                                title="Total Return"
                                content={dashboardData.totalReturn}
                                chart={
                                    <ProfitMiniAreaChart
                                        data={
                                            dashboardData.accumulatedProfitsPerDay
                                        }
                                    />
                                }
                            />
                        ),
                        card2: (
                            <Cards
                                title="Profit Factor"
                                content={dashboardData.profitFactor}
                                chart={
                                    <ProfitFactorMiniBarChart
                                        data={dashboardData.profitFactor}
                                    />
                                }
                            />
                        ),
                        card3: (
                            <Cards
                                title="Win Rate"
                                content={`${dashboardData.winningPercentage} %`}
                                chart={
                                    <WinRatePieChart
                                        data={[
                                            {
                                                name: "Total Winning Trades",
                                                value: dashboardData.totalWinningTrades,
                                            },
                                            {
                                                name: "Total Losing Trades",
                                                value: dashboardData.totalLosingTrades,
                                            },
                                            {
                                                name: "Breakeven",
                                                value: dashboardData.totalBreakevenTrades,
                                            },
                                        ]}
                                    />
                                }
                            />
                        ),
                        card4: (
                            <Cards
                                title="Average Win vs Loss"
                                content={`${dashboardData.averageReturn}`}
                                chart={
                                    <AverageWinVsLossBarChart
                                        data={[
                                            {
                                                name: "averages",
                                                averageWin:
                                                    dashboardData.averageWin,
                                                averageLoss:
                                                    dashboardData.averageLoss,
                                            },
                                        ]}
                                    />
                                }
                            />
                        ),
                        recentTradesWidget: (
                            <RecentTradesWidget
                                data={dashboardData.completeTradesInfo}
                            />
                        ),
                        equityCurve: (
                            <Profits
                                data={dashboardData.accumulatedProfitsPerDay}
                            />
                        ),
                        recentTrade: (
                            <BarChartRecentPerformance
                                data={getLastNumbersOfDayProfit(
                                    dashboardData.profitsPerDay,
                                    5
                                )}
                            />
                        ),
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
