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
    setPage,
    setShow,
    selectSearchTrades,
    selectStartDate,
    selectEndDate,
    selectPage,
    selectShow,
    selectTrades,
    selectTradesIsLoading,
    selectTradesHasError,
    fetchTrades,
    selectErrorMessage,
} from "../slice/tradeLogSlice";
import paginateData from "../utils/paginateData";
import searchTrade from "../utils/searchTrade";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Pagination from "../components/common/Pagination";
import getFilteredDataByDateRange from "../utils/getFilteredDataByDateRange";
import Modal from "../components/common/Modal";
import SessionExpired from "../components/SessionExpired";

const TradeLog = () => {
    const dispatch = useDispatch();
    const page = useSelector(selectPage);
    const show = useSelector(selectShow);
    const searchTerm = useSelector(selectSearchTrades);
    const startDate = useSelector(selectStartDate);
    const endDate = useSelector(selectEndDate);
    const errorMessage = useSelector(selectErrorMessage);

    useEffect(() => {
        dispatch(fetchTrades());
    }, [dispatch]);

    const isLoading = useSelector(selectTradesIsLoading);
    const hasError = useSelector(selectTradesHasError);
    const data = useSelector(selectTrades);

    if (isLoading) {
        return <div>Loading...</div>;
    } else if (hasError && errorMessage === "Server error") {
        return <div>There was an Error </div>;
    } else if (hasError && errorMessage === "Unauthorized") {
        return (
            <Modal open={true}>
                <SessionExpired />
            </Modal>
        )
    } else if (!data) {
        return <div>No data available</div>;
    }

    let tradeLogData = [...data.completeTradesInfo];

    // filter data by date range if start date and end date are selected
    if (startDate && endDate) {
        tradeLogData = getFilteredDataByDateRange(
            tradeLogData,
            startDate,
            endDate
        );
    }

    if (searchTerm) {
        tradeLogData = searchTrade(tradeLogData, searchTerm);
    }

    tradeLogData = tradeLogData.sort((a, b) => {
        const dateA = new Date(a.date_close);
        const dateB = new Date(b.date_close);

        return dateB - dateA;
    });

    // paginate data
    const tradeLogDataPaginated = paginateData(tradeLogData, show, page);

    // helper function to change limit of trades per page

    const tradeNumberStart = (page - 1) * show + 1;
    const tradeNumberEnd = (page, dataLength, limit) => {
        if (dataLength < limit) {
            // if (page === 1) {
            //   return dataLength
            // }
            return (page - 1) * limit + dataLength;
        } else {
            return page * limit;
        }
    };

    const getTotalNumberOfPage = (dataLength, limit) => {
        return Math.ceil(dataLength / limit);
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
                        <ProfitFactorMiniBarChart data={data.profitFactor} />
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
                <Table data={tradeLogDataPaginated} isRowClickable={true} />
                <div className="flex justify-center">
                    <div className="w-full h-24 flex items-center space-x-4">
                        <h2>Trades per Page:</h2>
                        <ButtonWithDropDownMenu
                            name={show}
                            list={[50, 100, 150]}
                            action={setShow}
                        />
                        <div className="border-l-2 h-12"></div>
                        <h2 className="">
                            {`${tradeNumberStart}-${tradeNumberEnd(
                                page,
                                tradeLogData.length,
                                show
                            )} out of ${tradeLogData.length}`}
                        </h2>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className=" p-2 text-slate-500 hover:bg-slate-100 hover:cursor-pointer">
                            <ChevronLeftIcon
                                onClick={() => {
                                    if (page > 1) {
                                        dispatch(setPage(page - 1));
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <Pagination
                                currentPage={page}
                                totalPages={getTotalNumberOfPage(
                                    tradeLogData.length,
                                    show
                                )}
                                action={setPage}
                            />
                        </div>
                        <div className="p-2 text-slate-500 hover:bg-slate-100 hover:cursor-pointer">
                            <ChevronRightIcon
                                onClick={() => {
                                    if (
                                        page <
                                        getTotalNumberOfPage(
                                            tradeLogData.length,
                                            show
                                        )
                                    ) {
                                        dispatch(setPage(page + 1));
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default TradeLog;
