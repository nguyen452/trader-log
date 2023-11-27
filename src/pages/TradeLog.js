import React, { useEffect } from "react";
import FilterBar from "../components/FIlterBar";
import Cards from "../components/Cards";
import ProfitMiniAreaChart from "../components/ProfitsMiniAreaChart";
import ProfitFactorMiniBarChart from "../components/ProfitFactorMiniBarChart";
import WinRatePieChart from "../components/WinRatePieChart";
import AverageWinVsLossBarChart from "../components/AverageWinVsLossBarChart";
import { useSelector, useDispatch } from "react-redux";
import Table from "../components/Table";
import ButtonWithDropDownMenu from "../components/common/ButtonWithDropDownMenu";
import {
    setSelectedTrade,
    setIsTradeLogOpen,
    searchTrades,
    setStartDate,
    setEndDate,
    setPage,
    setShow,
    selectSelectedTrade,
    selectIsTradeLogOpen,
    selectSearchTrades,
    selectStartDate,
    selectEndDate,
    selectPage,
    selectShow,
    selectTrades,
    selectTradesIsLoading,
    selectTradesHasError,
    fetchTrades,
} from "../slice/tradeLogSlice";
import paginateData from "../utils/paginateData";


const TradeLog = () => {
    const dispatch = useDispatch();
    const page = useSelector(selectPage);
    const show = useSelector(selectShow);

    const tradeNumberStart = (page - 1) * show + 1;
    const tradeNumberEnd = page * show;


    useEffect(() => {
        dispatch(fetchTrades());

    }, [dispatch]);

    const isLoading = useSelector(selectTradesIsLoading);
    const hasError = useSelector(selectTradesHasError);
    const data = useSelector(selectTrades);

    if (isLoading || !data) {
        return <div>Loading...</div>;
    } else if (hasError) {
        return <div>Error...</div>;
    }

    let tradeLogData = [...data.completeTradesInfo];

    tradeLogData = tradeLogData.sort((a, b) => {
       const dateA = new Date(a.date_close);
       const dateB = new Date(b.date_close);

        return dateB - dateA;
    })

    // paginate data
    console.log(page, show)
    tradeLogData = paginateData(tradeLogData, show, page);

    // helper function to change limit of trades per page

    const handleShowLimit = (limit) => {
        dispatch(setShow(limit));
    };

    const handlePageChange = (page) => {
        dispatch(setPage(page));
    };







    return (
        <main className=" flex flex-col w-full p-4">
            <div className=" w-full p-4 z-20">
                <FilterBar />
            </div>
            <div className="w-full flex justify-between h-48 p-4 mt-2">
                <Cards
                    title="Total Return"
                    content={data.totalReturn}
                    chart={
                        <ProfitMiniAreaChart
                            data={data.accumulatedProfitsPerDay}
                        />
                    }
                />
                <Cards
                    title="Profit Factor"
                    content={data.profitFactor}
                    chart={
                        <ProfitFactorMiniBarChart
                            data={data.profitFactor}
                        />
                    }
                />
                <Cards
                    title="Win Rate"
                    content={`${data.winningPercentage} %`}
                    chart={
                        <WinRatePieChart
                            data={[
                                {
                                    name: "Total Winning Trades",
                                    value: data.totalWinningTrades,
                                },
                                {
                                    name: "Total Losing Trades",
                                    value: data.totalLosingTrades,
                                },
                                {
                                    name: "Breakeven",
                                    value: data.totalBreakevenTrades,
                                },
                            ]}
                        />
                    }
                />

                <Cards
                    title="Average Win vs Loss"
                    content={`${data.averageReturn}`}
                    chart={
                        <AverageWinVsLossBarChart
                            data={[
                                {
                                    name: "averages",
                                    averageWin: data.averageWin,
                                    averageLoss: data.averageLoss,
                                },
                            ]}
                        />
                    }
                />
            </div>
            <div className=" bg-white p-8 mt-8 rounded-3xl shadow-md">
                <Table data={tradeLogData} />
                <div className="w-full h-24 flex items-center space-x-4">
                    <h2>Trades per Page:</h2>
                    <ButtonWithDropDownMenu
                        name={show}
                        list={[50, 100, 150]}
                        action={setShow}
                    />
                    <div className="border-l-2 h-12"></div>
                    <h2 className="">{`${tradeNumberStart}-${tradeNumberEnd} out of ${data.completeTradesInfo.length}`}</h2>
                </div>
            </div>
        </main>
    );
};

export default TradeLog;
