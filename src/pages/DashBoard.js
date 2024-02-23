import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import {
    fetchDashboard,
    changePeriod,
    filteredBySelectedPeriod,
    selectDashboardData,
    selectSelectedPeriod,
    selectDashboardIsLoading,
    selectDashboardHasError,
} from "../slice/dashboardSlice";
import getLastNumbersOfDayProfit from "../utils/getLastNumbersOfDayProfit";
import DashboardGrid from "../layout/DashboardGrid";
import Cards from "../components/Cards";
import Profits from "../layout/profits/Profits";
import SelectDayWidget from "../features/SelectDayWidget";
import ProfitMiniAreaChart from "../components/ProfitsMiniAreaChart";
import ProfitFactorMiniBarChart from "../components/ProfitFactorMiniBarChart";
import WinRatePieChart from "../components/WinRatePieChart";
import BarChartRecentPerformance from "../components/BarChartRecentPerformance";
import AverageWinVsLossBarChart from "../components/AverageWinVsLossBarChart";
import WelcomeBar from "../components/WelcomeBar";
import RecentTradesOpenTrades from "../components/RecentTradesOpenTrades";

const DashBoard = () => {
    const dashboardData = useSelector(selectDashboardData);
    const selectedPeriod = useSelector(selectSelectedPeriod);
    const isLoading = useSelector(selectDashboardIsLoading);
    const hasError = useSelector(selectDashboardHasError);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchDashboard(selectedPeriod));
    }, [selectedPeriod, dispatch]);

    if (isLoading || !dashboardData) {
        return <div>Loading...</div>;
    } else if (hasError) {
        return <div>Something went wrong...</div>;
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
                        selectDayWidget: (
                            <SelectDayWidget
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
                                    10
                                )}
                            />
                        ),
                        dataTable: <RecentTradesOpenTrades recentTradeData={dashboardData.completeTradesInfo} openTradeData = {[]} />,
                    }}
                />
            </div>

            <div className="flex flex-col gap-4 h-screen border-l"></div>
        </main>
    );
};

export default DashBoard;
